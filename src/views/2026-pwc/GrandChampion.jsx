import React from 'react'
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { usePWC } from './context/PWCContext.jsx'
import {
  getAgeGroupChampions,
  getGrandChampion,
  resolveGender,
} from './utils/getPWC2026.js'
import { PWC_2026 } from './utils/pwcConfig.js'
import { getAthleteHighlight } from './utils/athleteGroups.js'

// An athlete's name, colored if they belong to a highlighted group.
const AthleteName = ({ athlete, children }) => {
  const hl = getAthleteHighlight(athlete.firstName, athlete.lastName)
  return (
    <span
      style={hl ? { color: hl.color, fontWeight: 600 } : undefined}
      title={hl ? hl.group : undefined}
    >
      {children}
    </span>
  )
}

// One athlete cell in the age-group table; shows name + total, or a dash.
const ChampionCell = ({ athlete }) => {
  if (!athlete) {
    return <CTableDataCell className="text-medium-emphasis">—</CTableDataCell>
  }
  return (
    <CTableDataCell>
      <AthleteName athlete={athlete}>
        {athlete.firstName} {athlete.lastName}
      </AthleteName>{' '}
      <span className="text-medium-emphasis">({athlete.totalScore.toFixed(3)})</span>
    </CTableDataCell>
  )
}

// Grand Champion = the single athlete with the highest total score overall.
const GrandChampion = () => {
  const { data } = usePWC()
  const { athletes, date, isLoading, error } = data

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <CAlert color="danger">
        An error has occurred getting scores, refresh this page. If this problem
        continues to persist, contact Khai Nguyen.
      </CAlert>
    )
  }

  const topAthlete = getGrandChampion(athletes)
  // Only crown a champion once at least one score is in.
  const champion = topAthlete && topAthlete.totalScore > 0 ? topAthlete : null
  const ageGroupChampions = getAgeGroupChampions(athletes)

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CAlert color="info">
            Grand Champion as of {date}. To update, refresh this page or wait{' '}
            {Math.round(PWC_2026.REFRESH_MS / 1000)} seconds.
          </CAlert>
        </CCol>
      </CRow>

      {/* Overall grand champion (highest total of all men and women). */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Overall Grand Champion</strong> - Highest Total Score (Men &amp; Women)
            </CCardHeader>
            <CCardBody>
              {champion ? (
                <>
                  <h2 className="mb-1">
                    <AthleteName athlete={champion}>
                      {champion.firstName} {champion.lastName}
                    </AthleteName>
                  </h2>
                  <p className="text-medium-emphasis mb-3">
                    {resolveGender(champion.genderRaw) || champion.genderRaw}
                    {champion.age ? ` · Age ${champion.age}` : ''} · Total{' '}
                    <strong>{champion.totalScore.toFixed(3)}</strong>
                  </p>
                  <CListGroup>
                    {champion.topEvents.map((e, i) => (
                      <CListGroupItem
                        key={`${e.event}_${i}`}
                        className="d-flex justify-content-between"
                      >
                        <span>{e.event || 'Unknown event'}</span>
                        <span>{e.score.toFixed(3)}</span>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </>
              ) : (
                <CAlert color="warning" className="mb-0">
                  No scores have been entered yet.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Per-age-division grand champions (male + female in each group). */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Age Division Grand Champions</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Age Division</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Male Champion</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Female Champion</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ageGroupChampions.map(({ group, male, female }) => (
                    <CTableRow key={group.key}>
                      <CTableHeaderCell scope="row">{group.key}</CTableHeaderCell>
                      <CTableDataCell>{group.label}</CTableDataCell>
                      <ChampionCell athlete={male} />
                      <ChampionCell athlete={female} />
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default GrandChampion
