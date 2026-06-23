import { PWC_2026 } from './pwcConfig.js'

// Build the gviz JSON endpoint for a given tab (gid) of the configured sheet.
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
// We key by letter rather than header because several columns have blank headers
// and the user maps fields by column letter.
const tableToRows = (table) => {
  const letters = table.cols.map((col, idx) => col.id || `col${idx}`)
  return table.rows.map((row) => {
    const obj = {}
    letters.forEach((letter, idx) => {
      const cell = row.c?.[idx]
      // Prefer the raw value `v`; fall back to the formatted value `f`.
      obj[letter] = cell == null ? '' : cell.v != null ? cell.v : (cell.f ?? '')
    })
    return obj
  })
}

const toNumber = (value) => {
  if (typeof value === 'number') return value
  const n = parseFloat(String(value).replace(/[^0-9.\-]/g, ''))
  return Number.isFinite(n) ? n : null
}

const clean = (value) => String(value ?? '').trim()

// Decide which gender bucket ("Male" | "Female" | null) a raw value belongs to.
export const resolveGender = (genderRaw) => {
  const v = clean(genderRaw).toLowerCase()
  for (const [bucket, spellings] of Object.entries(PWC_2026.genderValues)) {
    if (spellings.some((s) => s.toLowerCase() === v)) return bucket
  }
  return null
}

// Unique athlete key = First + Last + Age + Gender (columns B–E).
const athleteKey = (row, C) =>
  [clean(row[C.firstName]), clean(row[C.lastName]), clean(row[C.age]), clean(row[C.gender])]
    .join('|')
    .toLowerCase()

// Fetch + merge all configured ring tabs, then build one athlete per unique key.
export async function getPWC2026(config = PWC_2026) {
  const { SHEET_ID, TABS, COLUMNS: C, qualifierValue, TOP_N } = config

  const tables = await Promise.all(
    TABS.map(async ({ gid }) => {
      const res = await fetch(buildGvizUrl(SHEET_ID, gid))
      if (!res.ok) throw new Error(`Failed to load tab ${gid} (HTTP ${res.status}).`)
      return tableToRows(parseGvizResponse(await res.text()))
    }),
  )

  const rows = tables.flat()
  const byKey = new Map()

  for (const row of rows) {
    const firstName = clean(row[C.firstName])
    if (!firstName) continue // skip blank / group rows

    // Only rows flagged in column H count toward standings.
    if (clean(row[C.qualifier]).toLowerCase() !== qualifierValue.toLowerCase()) continue

    const key = athleteKey(row, C)
    if (!byKey.has(key)) {
      byKey.set(key, {
        key,
        firstName,
        lastName: clean(row[C.lastName]),
        age: clean(row[C.age]),
        genderRaw: clean(row[C.gender]),
        qualifyingEvents: [],
      })
    }

    byKey.get(key).qualifyingEvents.push({
      event: clean(row[C.event]),
      score: toNumber(row[C.score]) ?? 0,
    })
  }

  // Per athlete: keep the highest TOP_N scoring events; total = their sum.
  const athletes = Array.from(byKey.values()).map((a) => {
    const topEvents = [...a.qualifyingEvents]
      .sort((x, y) => y.score - x.score)
      .slice(0, TOP_N)
    const totalScore = topEvents.reduce((sum, e) => sum + e.score, 0)
    return { ...a, topEvents, totalScore }
  })

  return { athletes, topN: TOP_N }
}

// Athletes for one gender bucket, sorted by total score descending.
export const getStandings = (athletes, gender) =>
  athletes
    .filter((a) => resolveGender(a.genderRaw) === gender)
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

// Grand Champion eligibility: must have competed at least 3 forms. (Per the
// award rules one must be a hand form and one a weapon form; athletes flagged
// "Yes" are assumed to satisfy that split at registration.)
export const GC_MIN_FORMS = 3
export const isGrandChampionEligible = (a) => a.qualifyingEvents.length >= GC_MIN_FORMS

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
