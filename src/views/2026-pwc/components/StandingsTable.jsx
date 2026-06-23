import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'

import { AGE_GROUPS, getAgeGroup } from '../utils/getPWC2026.js'
import { getAthleteHighlight, getAthleteRowStyle } from '../utils/athleteGroups.js'
import '../pwc.css'

// One score cell: shows the score, with the actual event name (column G) in a
// tooltip. Renders a dash when the athlete has no event in that slot yet.
const EventCell = ({ event }) => {
  if (!event) return <CTableDataCell>-</CTableDataCell>
  return (
    <CTableDataCell>
      <CTooltip content={event.event || 'Unknown event'}>
        <span style={{ cursor: 'help', textDecoration: 'underline dotted' }}>
          {event.score.toFixed(3)}
        </span>
      </CTooltip>
    </CTableDataCell>
  )
}

// Value accessors for the sortable columns (Event 1..N are intentionally not sortable).
const fullName = (a) => `${a.firstName} ${a.lastName}`.trim()

const SORT_ACCESSORS = {
  rank: (a) => a.rank,
  athleteName: (a) => fullName(a).toLowerCase(),
  age: (a) => parseInt(a.age, 10) || 0,
  group: (a) => a.groupKey || '',
  totalScore: (a) => a.totalScore,
}

// A clickable, sortable header cell.
const SortHeader = ({ label, sortKey, sortConfig, onSort }) => {
  const active = sortConfig.key === sortKey
  const arrow = active ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ''
  return (
    <CTableHeaderCell
      scope="col"
      role="button"
      onClick={() => onSort(sortKey)}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      {label}
      {arrow}
    </CTableHeaderCell>
  )
}

// Ranked standings for one gender. Each athlete's total is the sum of their top
// `topN` event scores; those events are shown as Event 1..N with name tooltips.
// All columns are sortable except the Event columns. The Group column can be
// filtered to a single age division, in which case Rank renumbers within that
// group so an athlete can see where they stand for that division's award.
const StandingsTable = ({ gender, athletes, topN = 3 }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' })
  const [groupFilter, setGroupFilter] = useState('ALL')
  const eventSlots = Array.from({ length: topN }, (_, i) => i)

  // Tag each athlete with their age-division group.
  const tagged = athletes.map((a) => {
    const group = getAgeGroup(a.age)
    return { ...a, groupKey: group?.key || null, groupLabel: group?.label || '' }
  })

  // Apply the group filter.
  const filtered =
    groupFilter === 'ALL' ? tagged : tagged.filter((a) => a.groupKey === groupFilter)

  // Assign a standing rank (by total, descending) within the current filter.
  const ranked = [...filtered]
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((a, idx) => ({ ...a, rank: idx + 1 }))

  // Apply the active column sort for display.
  const accessor = SORT_ACCESSORS[sortConfig.key] || SORT_ACCESSORS.rank
  const displayed = [...ranked].sort((a, b) => {
    const av = accessor(a)
    const bv = accessor(b)
    let cmp = 0
    if (typeof av === 'string' || typeof bv === 'string') {
      cmp = String(av).localeCompare(String(bv))
    } else {
      cmp = av - bv
    }
    return sortConfig.direction === 'asc' ? cmp : -cmp
  })

  const onSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    )
  }

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span>
          <strong>Live Standings</strong> - {gender}
        </span>
        <CFormSelect
          size="sm"
          style={{ width: 'auto' }}
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          aria-label="Filter by age group"
        >
          <option value="ALL">All Groups</option>
          {AGE_GROUPS.map((g) => (
            <option key={g.key} value={g.key}>
              Group {g.key} ({g.label})
            </option>
          ))}
        </CFormSelect>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <SortHeader label="Rank" sortKey="rank" sortConfig={sortConfig} onSort={onSort} />
              <SortHeader
                label="Athlete Name"
                sortKey="athleteName"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <SortHeader label="Age" sortKey="age" sortConfig={sortConfig} onSort={onSort} />
              <SortHeader label="Group" sortKey="group" sortConfig={sortConfig} onSort={onSort} />
              {eventSlots.map((i) => (
                <CTableHeaderCell key={i} scope="col">
                  Event {i + 1}
                </CTableHeaderCell>
              ))}
              <SortHeader
                label="Total Score"
                sortKey="totalScore"
                sortConfig={sortConfig}
                onSort={onSort}
              />
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {displayed.map((athlete) => {
              const rowStyle = getAthleteRowStyle(athlete.firstName, athlete.lastName)
              return (
              <CTableRow
                key={athlete.key}
                className={rowStyle ? 'pwc-highlight-row' : undefined}
                style={rowStyle || undefined}
              >
                <CTableHeaderCell scope="row">#{athlete.rank}</CTableHeaderCell>
                <CTableDataCell>
                  {(() => {
                    const hl = getAthleteHighlight(athlete.firstName, athlete.lastName)
                    return (
                      <span
                        style={hl ? { color: hl.color, fontWeight: 600 } : undefined}
                        title={hl ? hl.group : undefined}
                      >
                        {fullName(athlete)}
                      </span>
                    )
                  })()}
                </CTableDataCell>
                <CTableDataCell>{athlete.age}</CTableDataCell>
                <CTableDataCell>
                  {athlete.groupKey ? (
                    <CTooltip content={athlete.groupLabel}>
                      <span style={{ cursor: 'help' }}>{athlete.groupKey}</span>
                    </CTooltip>
                  ) : (
                    '-'
                  )}
                </CTableDataCell>
                {eventSlots.map((i) => (
                  <EventCell key={i} event={athlete.topEvents[i]} />
                ))}
                <CTableDataCell>
                  <strong>{athlete.totalScore.toFixed(3)}</strong>
                </CTableDataCell>
              </CTableRow>
              )
            })}
            {displayed.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={5 + topN} className="text-center text-medium-emphasis">
                  No athletes in this group.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default StandingsTable
