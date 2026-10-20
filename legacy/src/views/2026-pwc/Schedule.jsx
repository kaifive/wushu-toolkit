import React, { useEffect, useState } from 'react'
import { CAlert, CCard, CCardBody, CCol, CRow } from '@coreui/react'

import { getRingBySlug, getSchedule } from './utils/getSchedule.js'
import { PWC_2026 } from './utils/pwcConfig.js'
import ScheduleCard from './components/ScheduleCard.jsx'

// Pull the ring slug ("ring-1") off the end of the hash route.
const ringSlugFromHash = () => {
  const parts = window.location.hash.split('/').filter(Boolean)
  return parts[parts.length - 1] || ''
}

const nowCentral = () =>
  new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })

// A labeled break/intermission banner between two session cards.
const BreakBanner = ({ label }) => (
  <CCard color="warning" className="mb-3 text-center">
    <CCardBody className="py-2">
      <strong>{label}</strong>
    </CCardBody>
  </CCard>
)

const Schedule = () => {
  const slug = ringSlugFromHash()
  const ring = getRingBySlug(slug)

  const [state, setState] = useState({
    blocks: [],
    date: nowCentral(),
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    if (!ring) {
      setState((s) => ({ ...s, isLoading: false, error: new Error('Unknown ring.') }))
      return
    }

    let active = true
    const load = async () => {
      try {
        const blocks = await getSchedule(ring.gid)
        if (active) setState({ blocks, date: nowCentral(), isLoading: false, error: null })
      } catch (error) {
        if (active) setState((s) => ({ ...s, date: nowCentral(), isLoading: false, error }))
      }
    }

    load()
    const interval = setInterval(load, PWC_2026.REFRESH_MS)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [ring?.gid])

  if (!ring) {
    return <CAlert color="danger">Unknown ring &quot;{slug}&quot;.</CAlert>
  }

  if (state.isLoading) {
    return <div>Loading...</div>
  }

  if (state.error) {
    return (
      <CAlert color="danger">
        Could not load the {ring.name} schedule, refresh this page. If this problem
        continues to persist, contact Khai Nguyen.
      </CAlert>
    )
  }

  let sessionNumber = 0

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CAlert color="info">
            {ring.name} schedule as of {state.date}. Times are estimated and refresh every{' '}
            {Math.round(PWC_2026.REFRESH_MS / 1000)} seconds.
          </CAlert>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          {state.blocks.map((block, i) => {
            if (block.type === 'break') {
              return <BreakBanner key={`break_${i}`} label={block.label} />
            }
            sessionNumber += 1
            return <ScheduleCard key={`session_${i}`} session={block} index={sessionNumber} />
          })}
        </CCol>
      </CRow>
    </>
  )
}

export default Schedule
