import Papa from 'papaparse'
import { PWC_2026 } from './pwcConfig.js'

const clean = (value) => String(value ?? '').trim()

// Find a ring tab config by its url slug, e.g. "ring-1" -> { gid, name }.
export const getRingBySlug = (slug) => {
  const idx = PWC_2026.TABS.findIndex(
    (t) => t.name.toLowerCase().replace(/\s+/g, '-') === slug,
  )
  return idx === -1 ? null : PWC_2026.TABS[idx]
}

// A row is a break/intermission label when column A has text but the athlete
// columns (first/last name, event) are empty.
const isBreakRow = (cols, C) =>
  clean(cols[C.time]) &&
  !clean(cols[C.firstName]) &&
  !clean(cols[C.lastName]) &&
  !clean(cols[C.event])

// A row carries an actual competitor when it has a name or an event.
const isEntryRow = (cols, C) =>
  clean(cols[C.firstName]) || clean(cols[C.lastName]) || clean(cols[C.event])

const mapEntry = (cols, C) => ({
  time: clean(cols[C.time]),
  firstName: clean(cols[C.firstName]),
  lastName: clean(cols[C.lastName]),
  experience: clean(cols[C.experience]),
  event: clean(cols[C.event]),
  score: clean(cols[C.score]),
})

// Parse the CSV text for one ring into an ordered list of blocks:
//   { type: 'session', start, end, entries: [...] }
//   { type: 'break', label }
// Sessions are the runs of competitors between breaks; each becomes a card.
export const parseScheduleCsv = (csvText, columns = PWC_2026.SCHEDULE_COLUMNS) => {
  const { data } = Papa.parse(csvText, { skipEmptyLines: false })
  const C = columns

  const blocks = []
  let current = []

  const flush = () => {
    if (!current.length) return
    blocks.push({
      type: 'session',
      start: current[0].time,
      end: current[current.length - 1].time,
      entries: current,
    })
    current = []
  }

  // Skip the leading title/blank rows and the column-header row; data starts
  // right after the row whose First Name column literally says "First Name".
  const headerIdx = data.findIndex(
    (cols) => clean(cols[C.firstName]).toLowerCase() === 'first name',
  )
  const rows = headerIdx === -1 ? data : data.slice(headerIdx + 1)

  rows.forEach((cols) => {
    if (isBreakRow(cols, C)) {
      flush()
      blocks.push({ type: 'break', label: clean(cols[C.time]) })
    } else if (isEntryRow(cols, C)) {
      current.push(mapEntry(cols, C))
    }
  })
  flush()

  return blocks
}

// Status of an entry relative to the current competitor, by schedule position.
const STATUS_BY_OFFSET = { 0: 'current' }

// Flag the "current" competitor and mark finished sessions.
//
// The current competitor is the entry immediately after the latest one that has
// a score: scores fill in as athletes finish, so the last scored entry in
// schedule order is whoever just competed, and the next one up is current.
// Athletes can be skipped, so we key off the latest score, not the first gap.
//
// If nothing is scored yet the first entry is current; if everything is scored
// no one is flagged. A session is "finished" once the current competitor has
// moved past all of its entries.
export const withCurrentCompetitor = (blocks) => {
  const flat = []
  blocks.forEach((b) => {
    if (b.type === 'session') b.entries.forEach((e) => flat.push(e))
  })

  let lastScored = -1
  flat.forEach((e, i) => {
    if (clean(e.score) !== '') lastScored = i
  })
  const currentIdx = lastScored + 1 // next after last scored (0 when none scored)

  let gi = 0
  return blocks.map((b) => {
    if (b.type !== 'session') return b
    const entries = b.entries.map((e) => {
      const status = STATUS_BY_OFFSET[gi - currentIdx] || null
      gi += 1
      return { ...e, status, isCurrent: status === 'current' }
    })
    // The session is finished when every one of its entries is before the
    // current competitor (i.e. the last entry's index < currentIdx).
    const finished = gi <= currentIdx
    return { ...b, entries, finished }
  })
}

// Fetch + parse one ring's schedule, with the current competitor flagged.
// `sheetId` defaults to the configured sheet.
export async function getSchedule(gid, sheetId = PWC_2026.SHEET_ID) {
  const url = PWC_2026.scheduleCsvUrl(sheetId, gid)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to load schedule (HTTP ${res.status}).`)
  }
  return withCurrentCompetitor(parseScheduleCsv(await res.text()))
}
