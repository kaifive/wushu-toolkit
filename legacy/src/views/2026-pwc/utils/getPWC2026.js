import { PWC_2026 } from './pwcConfig.js'

// Build the gviz JSON endpoint for a given tab (gid) of a sheet.
const buildGvizUrl = (sheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`

// gviz wraps its JSON in `/*O_o*/\ngoogle.visualization.Query.setResponse(...);`
// Strip the wrapper and return the parsed table object.
const parseGvizResponse = (text) => {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1) {
    throw new Error('Unexpected gviz response (could not locate JSON body).')
  }
  const json = JSON.parse(text.slice(start, end + 1))
  if (json.status === 'error') {
    const message = json.errors?.map((e) => e.detailed_message || e.message).join('; ')
    throw new Error(`gviz error: ${message || 'unknown error'}`)
  }
  return json.table
}

// Convert a gviz table into plain row objects keyed by column LETTER (A, B, C...).
const tableToRows = (table) => {
  const letters = table.cols.map((col, idx) => col.id || `col${idx}`)
  return table.rows.map((row) => {
    const obj = {}
    letters.forEach((letter, idx) => {
      const cell = row.c?.[idx]
      obj[letter] = cell == null ? '' : cell.v != null ? cell.v : (cell.f ?? '')
    })
    return obj
  })
}

const toNumber = (value) => {
  if (typeof value === 'number') return value
  const n = parseFloat(String(value).replace(/[^0-9.\-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

const clean = (value) => String(value ?? '').trim()

// Athlete identity used to merge rows and to join prod <-> reference: first + last
// name, case-insensitive.
const nameKey = (first, last) => `${clean(first).toLowerCase()}|${clean(last).toLowerCase()}`

// Fetch every configured ring tab of a sheet and return all rows merged.
const fetchAllTabs = async (sheetId) => {
  const tables = await Promise.all(
    PWC_2026.TABS.map(async ({ gid }) => {
      const res = await fetch(buildGvizUrl(sheetId, gid))
      if (!res.ok) throw new Error(`Failed to load tab ${gid} (HTTP ${res.status}).`)
      return tableToRows(parseGvizResponse(await res.text()))
    }),
  )
  return tables.flat()
}

// Decide which gender bucket ("Male" | "Female" | null) a raw value belongs to.
export const resolveGender = (genderRaw) => {
  const v = clean(genderRaw).toLowerCase()
  for (const [bucket, spellings] of Object.entries(PWC_2026.genderValues)) {
    if (spellings.some((s) => s.toLowerCase() === v)) return bucket
  }
  return null
}

// Build a name -> { age, registered } lookup from the reference (copy) sheet,
// which still carries Age and the all-around-champion registration flag.
const getReference = async (config) => {
  const R = config.REFERENCE_COLUMNS
  const rows = await fetchAllTabs(config.REFERENCE_SHEET_ID)
  const ref = new Map()
  rows.forEach((row) => {
    const first = clean(row[R.firstName])
    if (!first) return
    const key = nameKey(first, row[R.lastName])
    const registered =
      clean(row[R.registered]).toLowerCase() === config.registeredValue.toLowerCase()
    const prev = ref.get(key)
    if (prev) {
      // Age is constant per athlete; registration counts if any row says yes.
      prev.age = prev.age || clean(row[R.age])
      prev.registered = prev.registered || registered
    } else {
      ref.set(key, { age: clean(row[R.age]), registered })
    }
  })
  return ref
}

// Fetch prod scores + the reference lookup, then build one athlete per name with
// age/registration joined in. `config` defaults to the configured sheet.
export async function getPWC2026(config = PWC_2026) {
  const { COLUMNS: C, TOP_N } = config

  const [reference, rows] = await Promise.all([
    getReference(config),
    fetchAllTabs(config.SHEET_ID),
  ])

  const byKey = new Map()
  rows.forEach((row) => {
    const firstName = clean(row[C.firstName])
    if (!firstName) return
    const lastName = clean(row[C.lastName])
    const key = nameKey(firstName, lastName)

    if (!byKey.has(key)) {
      const ref = reference.get(key) || { age: '', registered: false }
      byKey.set(key, {
        key,
        firstName,
        lastName,
        genderRaw: clean(row[C.gender]),
        age: ref.age,
        registered: ref.registered,
        qualifyingEvents: [],
      })
    }

    byKey.get(key).qualifyingEvents.push({
      event: clean(row[C.event]),
      score: toNumber(row[C.score]),
    })
  })

  // Per athlete: keep the highest TOP_N scoring events; total = their sum.
  const athletes = Array.from(byKey.values()).map((a) => {
    const topEvents = [...a.qualifyingEvents].sort((x, y) => y.score - x.score).slice(0, TOP_N)
    const totalScore = topEvents.reduce((sum, e) => sum + e.score, 0)
    return { ...a, topEvents, totalScore }
  })

  return { athletes, topN: TOP_N }
}

// Standings show the all-around-champion registrants for one gender, ranked by total.
export const getStandings = (athletes, gender) =>
  athletes
    .filter((a) => a.registered && resolveGender(a.genderRaw) === gender)
    .sort((a, b) => b.totalScore - a.totalScore)

// The eight Grand Champion age divisions (each awarded per gender).
export const AGE_GROUPS = [
  { key: 'A', label: '8 & under', min: 0, max: 8 },
  { key: 'B', label: '9–11', min: 9, max: 11 },
  { key: 'C', label: '12–14', min: 12, max: 14 },
  { key: 'D', label: '15–17', min: 15, max: 17 },
  { key: 'E', label: '18–21', min: 18, max: 21 },
  { key: 'F', label: '22–29', min: 22, max: 29 },
  { key: 'G', label: '30–39', min: 30, max: 39 },
  { key: 'H', label: '40 & over', min: 40, max: Infinity },
]

export const getAgeGroup = (age) => {
  const n = parseInt(age, 10)
  if (!Number.isFinite(n)) return null
  return AGE_GROUPS.find((g) => n >= g.min && n <= g.max) || null
}

// Grand Champion eligibility: registered for the all-around award and competed
// at least 3 forms. (Per the rules one must be a hand form and one a weapon
// form; registered athletes are assumed to satisfy that split at registration.)
export const GC_MIN_FORMS = 3
export const isGrandChampionEligible = (a) =>
  a.registered && a.qualifyingEvents.length >= GC_MIN_FORMS

// Overall grand champion = highest total across all eligible athletes (any gender).
export const getGrandChampion = (athletes) =>
  athletes
    .filter(isGrandChampionEligible)
    .reduce((best, a) => (!best || a.totalScore > best.totalScore ? a : best), null)

// Highest-total eligible male and female in each age division (the 16 trophies).
// A champion is only named once they have a scored total (> 0).
export const getAgeGroupChampions = (athletes) => {
  const eligible = athletes.filter(isGrandChampionEligible)
  const topByGender = (pool, gender) => {
    const top = pool
      .filter((a) => resolveGender(a.genderRaw) === gender)
      .sort((x, y) => y.totalScore - x.totalScore)[0]
    return top && top.totalScore > 0 ? top : null
  }

  return AGE_GROUPS.map((group) => {
    const inGroup = eligible.filter((a) => getAgeGroup(a.age)?.key === group.key)
    return {
      group,
      male: topByGender(inGroup, 'Male'),
      female: topByGender(inGroup, 'Female'),
    }
  })
}
