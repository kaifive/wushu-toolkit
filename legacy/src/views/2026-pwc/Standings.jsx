import React from 'react'
import { CAlert, CCol, CRow } from '@coreui/react'

import { usePWC } from './context/PWCContext.jsx'
import { getStandings } from './utils/getPWC2026.js'
import { PWC_2026 } from './utils/pwcConfig.js'
import StandingsTable from './components/StandingsTable.jsx'

// Single component backs both the male and female standings routes; the gender
// is chosen from the URL hash (mirrors the 2025 juniors pattern).
const Standings = () => {
  const { data } = usePWC()
  const { athletes, topN, date, isLoading, error } = data

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

  const gender = window.location.hash.includes('female') ? 'Female' : 'Male'
  const standings = getStandings(athletes, gender)

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CAlert color="info">
            Standings as of {date}. To update scores, refresh this page or wait{' '}
            {Math.round(PWC_2026.REFRESH_MS / 1000)} seconds.
          </CAlert>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          {standings.length ? (
            <StandingsTable gender={gender} athletes={standings} topN={topN} />
          ) : (
            <CAlert color="warning">No {gender.toLowerCase()} athletes found yet.</CAlert>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Standings
