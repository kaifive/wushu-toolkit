import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronBottom, cilChevronTop } from '@coreui/icons'

import { getAthleteHighlight, getAthleteRowStyle } from '../utils/athleteGroups.js'
import '../pwc.css'

// Badge shown next to the current competitor.
const STATUS_BADGE = {
  current: { label: 'Up Now', color: 'info' },
}

// Row tint for the current competitor (blue). A grouped-athlete tint takes
// priority over this.
const CURRENT_ROW_STYLE = { '--pwc-row-bg': 'rgba(51, 153, 255, 0.25)' }

// A collapsible card for one schedule session (the run of competitors between
// two breaks). Open by default while in progress; auto-collapses once finished.
const ScheduleCard = ({ session, index }) => {
  const { start, end, entries, finished } = session
  const [open, setOpen] = useState(!finished)

  // Collapse automatically when the session transitions to finished. We only
  // react to that transition, so a manually re-opened finished card stays open.
  useEffect(() => {
    if (finished) setOpen(false)
  }, [finished])

  return (
    <CCard className="mb-3">
      <CCardHeader
        role="button"
        onClick={() => setOpen((v) => !v)}
        className="d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <span>
          <strong>Session {index}</strong> · {start} – {end}{' '}
          <span className="text-medium-emphasis">({entries.length})</span>
          {finished && (
            <CBadge color="secondary" className="ms-2">
              Finished
            </CBadge>
          )}
        </span>
        <CIcon icon={open ? cilChevronTop : cilChevronBottom} />
      </CCardHeader>
      <CCollapse visible={open}>
        <CCardBody>
          <CTable striped hover responsive className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
                <CTableHeaderCell scope="col">Event</CTableHeaderCell>
                <CTableHeaderCell scope="col">Athlete Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Score</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {entries.map((e, i) => {
                const badge = e.status ? STATUS_BADGE[e.status] : null
                const hl = getAthleteHighlight(e.firstName, e.lastName)
                // Grouped-athlete tint wins over the current-competitor tint.
                const rowStyle =
                  getAthleteRowStyle(e.firstName, e.lastName) ||
                  (e.status === 'current' ? CURRENT_ROW_STYLE : undefined)
                return (
                  <CTableRow
                    key={`${e.time}_${e.firstName}_${e.lastName}_${i}`}
                    className={rowStyle ? 'pwc-highlight-row' : undefined}
                    style={rowStyle}
                  >
                    <CTableDataCell>{e.time}</CTableDataCell>
                    <CTableDataCell>{e.experience}</CTableDataCell>
                    <CTableDataCell>{e.event}</CTableDataCell>
                    <CTableDataCell>
                      <span
                        style={hl ? { color: hl.color, fontWeight: 600 } : undefined}
                        title={hl ? hl.group : undefined}
                      >
                        {`${e.firstName} ${e.lastName}`.trim()}
                      </span>
                      {badge && (
                        <CBadge color={badge.color} className="ms-2">
                          {badge.label}
                        </CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{e.score || '-'}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCollapse>
    </CCard>
  )
}

export default ScheduleCard
