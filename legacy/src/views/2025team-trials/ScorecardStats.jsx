import React from 'react'
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
import { CATEGORY_MAP } from '../sportdataComponents/lookups/categoryMap.js'

import { determineAdultWushuTeam } from "./utils/determineAdultWushuTeam.js"

import {
    countAndSortDeductionCodes,
    calculateAverageEventScores,
} from "./utils/stats.js"

import test from "../sportdataComponents/utils/snapshots/2025-phoenix-2025-06-13T20-57-34-230Z.json"

const cleanDeductionCode = (codeString) => {
    // Use a regular expression to match one or more digits (^\d+)
    // at the beginning of the string.
    const match = codeString.match(/^\d+/);

    // If a match is found, return the matched numeric part.
    // Otherwise, return the original string (e.g., if it's empty or doesn't start with digits).
    return match ? match[0] : codeString;
};

const ScorecardStats = () => {
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

    const topTenDeductions = countAndSortDeductionCodes(athleteData).slice(0, 10)
    const averageScoresByEvent = calculateAverageEventScores(athleteData)

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Standings as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Top 10 Deductions</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Deduction Code</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Number of Occurances</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {topTenDeductions.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan={4} className="text-center text-muted">
                                                No deductions yet.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        topTenDeductions.map((deduction) => (
                                            <CTableRow key={`${deduction.code}`}>
                                                <CTableHeaderCell scope="row">
                                                    <a href={`#/toolkit/deduction-code-lookup?code=${cleanDeductionCode(deduction.code)}`} target='_blank'>
                                                        {deduction.code}
                                                    </a>
                                                </CTableHeaderCell>
                                                <CTableDataCell>{deduction.count}</CTableDataCell>
                                            </CTableRow>
                                        ))
                                    )}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Average Score Breakdowns By Event</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Event</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Average A Score</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Average B Score</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Average C Score</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Average Final Score</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {averageScoresByEvent.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan={4} className="text-center text-muted">
                                                No scores found.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        averageScoresByEvent.map((event) => (
                                            <CTableRow key={`${event.event.toLowerCase()}`}>
                                                <CTableHeaderCell scope="row">{event.event}</CTableHeaderCell>
                                                <CTableDataCell>{event.averageA}</CTableDataCell>
                                                <CTableDataCell>{event.averageB}</CTableDataCell>
                                                <CTableDataCell>{event.averageC}</CTableDataCell>
                                                <CTableDataCell>{event.averageFinal}</CTableDataCell>
                                            </CTableRow>
                                        ))
                                    )}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default ScorecardStats
