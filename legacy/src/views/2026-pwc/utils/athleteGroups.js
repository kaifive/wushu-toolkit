// Color-code specific sets of athletes wherever their name appears (schedule,
// standings, grand champion).
//
// HOW TO USE:
//   - Add or remove a name by editing a group's `athletes` list. Each entry is
//     [firstName, lastName]; matching is case-insensitive and trims spaces.
//   - To color a whole new set of athletes, copy a group block, give it a unique
//     `name` and `color`, and list its athletes. Order matters only if the same
//     athlete appears in two groups (the first group listed wins).

export const ATHLETE_GROUPS = [
  {
    name: 'Nova Wushu',
    color: '#6f42c1', // purple
    athletes: [
      ['Aaron', 'Yang'],
      ['Ryan', 'Tran'],
      ['Benjamin', 'Le'],
      ['Daniel', 'Sinor'],
      ['Joshua', 'Le'],
      ['Aivy', 'Stone'],
      ['Elizabeth', 'Le'],
      ['Arya', 'Mohan'],
      ['Denisa', 'Bento'],
      ['Nanette', 'Hill'],
      ['Samson', 'Turner'],
    ],
  },
]

const norm = (s) => String(s ?? '').trim().toLowerCase()
const keyOf = (first, last) => `${norm(first)}|${norm(last)}`

// Precompute a name -> { color, group } lookup once.
const LOOKUP = (() => {
  const map = new Map()
  ATHLETE_GROUPS.forEach((group) => {
    group.athletes.forEach(([first, last]) => {
      const k = keyOf(first, last)
      if (!map.has(k)) map.set(k, { color: group.color, group: group.name })
    })
  })
  return map
})()

// Returns { color, group } for a highlighted athlete, or null if not in any group.
export const getAthleteHighlight = (firstName, lastName) =>
  LOOKUP.get(keyOf(firstName, lastName)) || null

// Translucent background tint used to highlight a grouped athlete's whole row.
const ROW_ALPHA = 0.2

export const hexToRgba = (hex, alpha) => {
  const h = String(hex).replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

// Row style for a grouped athlete (null if not in any group). Supplies the
// --pwc-row-bg custom property consumed by the `.pwc-highlight-row` CSS class.
// Used to tint the whole row; takes priority over the "current competitor" tint.
export const getAthleteRowStyle = (firstName, lastName) => {
  const hl = getAthleteHighlight(firstName, lastName)
  return hl ? { '--pwc-row-bg': hexToRgba(hl.color, ROW_ALPHA) } : null
}
