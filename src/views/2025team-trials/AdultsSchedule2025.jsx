import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip,
    CRow,
    CCol,
    CAlert
} from '@coreui/react'

import { useSportdata } from '../sportdataComponents/context/SportdataContext.jsx';

import eventOrder from './lookups/eventOrder.js';

const AdultsSchedule2025 = () => {
    const sportdataContext = useSportdata();
    const { data: contextData, filters, setFilters } = sportdataContext
    const { athleteData, date, isLoading, error } = contextData

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <CAlert color="danger">
                An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen.
            </CAlert>
        )
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Standings as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            {Object.entries(eventOrder).map(([event, order]) => {
                return (
                    <EventSchedule
                        event={event}
                        order={order}

                    />
                )
            })}
        </>
    )
}
const EventSchedule = ({ event, order }) => {
    const sportdataContext = useSportdata()
    const { data: contextData, filters, setFilters } = sportdataContext
    const { athleteData } = contextData

    const genderKey = event.includes("Men´s") ? "MALES" : "FEMALES"
    const genderedAthleteData = athleteData[genderKey]

    // Compute scores once on mount to determine initial expand/collapse state
    const [expanded, setExpanded] = useState(true)

    useEffect(() => {
        const scores = []

        order.forEach((athlete) => {
            const sanitizedAthleteName = athlete.replace(/_/g, " ")
            let finalScore

            Object.values(genderedAthleteData).forEach((registrations) => {
                Object.values(registrations).forEach((registration) => {
                    if (
                        registration.competitor.name.toLowerCase().includes(sanitizedAthleteName.toLowerCase()) ||
                        sanitizedAthleteName.toLowerCase().includes(registration.competitor.name.toLowerCase())
                    ) {
                        registration.events.forEach((e) => {
                            if (e.event === event) {
                                finalScore = e.finalScore
                            }
                        })
                    }
                })
            })

            scores.push(parseFloat(finalScore ?? 0))
        })

        const allZero = scores.every(score => score === 0)
        const allNonZero = scores.every(score => score !== 0)
        const isMixed = !allZero && !allNonZero

        setExpanded(isMixed) // Expand only if scores are mixed
    }, [event, order, genderedAthleteData])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader
                        style={{ cursor: 'pointer' }}
                        onClick={() => setExpanded(prev => !prev)}
                    >
                        <strong>{event}</strong> {expanded ? "▾" : "▸"}
                    </CCardHeader>

                    {expanded && (
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Order #</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Athlete Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Score</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {order.map((athlete, idx) => {
                                        const sanitizedAthleteName = athlete.replace(/_/g, " ")
                                        let finalScore
                                        let matchedName = ""

                                        Object.entries(genderedAthleteData).forEach(([_, registrations]) => {
                                            Object.entries(registrations).forEach(([_, registration]) => {
                                                if (
                                                    registration.competitor.name.toLowerCase().includes(sanitizedAthleteName.toLowerCase()) ||
                                                    sanitizedAthleteName.toLowerCase().includes(registration.competitor.name.toLowerCase())
                                                ) {
                                                    matchedName = registration.competitor.name
                                                    registration.events.forEach((e) => {
                                                        if (e.event === event) {
                                                            finalScore = e.finalScore
                                                        }
                                                    })
                                                }
                                            })
                                        })

                                        return (
                                            <CTableRow key={`${athlete.toLowerCase()}`}>
                                                <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
                                                <CTableDataCell>{matchedName || sanitizedAthleteName}</CTableDataCell>
                                                <CTableDataCell>
                                                    <a
                                                        href="#/2025-adults/scorecard"
                                                        target="_blank"
                                                        onClick={(e) => {
                                                            const eventNameArr = event.split(" ")

                                                            setFilters({
                                                                genderFilter: event.includes("Men") ? "MALES" : "FEMALES",
                                                                categoryFilter: filters.categoryFilter,
                                                                eventFilter: eventNameArr[eventNameArr.length - 1],
                                                                athleteFilter: matchedName,
                                                            })
                                                        }}
                                                    >
                                                        {finalScore ?? "0.000"}
                                                    </a>
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    )}
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AdultsSchedule2025
