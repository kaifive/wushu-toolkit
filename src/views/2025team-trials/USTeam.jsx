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
import { getTeamStatus } from "./utils/getTeamStatus.js"

function getCategoryKeyByValue(value) {
    return Object.entries(CATEGORY_MAP).find(([key, val]) => val === value)?.[0] || null;
}

const USTeam = ({
    gender,
    category,
    data
}) => {
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

    const maleTeam = determineAdultWushuTeam(athleteData.MALES)
    const femaleTeam = determineAdultWushuTeam(athleteData.FEMALES)

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
                            <strong>US Team</strong> - Males
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Team Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Average Final Score</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {Object.values(maleTeam).flat().length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan={4} className="text-center text-muted">
                                                No athletes on the team yet.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        Object.entries(maleTeam).map(([team, teamMembers]) => {
                                            const teamStatusMapping = {
                                                aTeam: "A Team",
                                                bTeam: "B Team",
                                                cTeam: "C Team"
                                            };

                                            return teamMembers.map((teamMemberInfo) => (
                                                <CTableRow key={`${team}-${teamMemberInfo.name}`}>
                                                    <CTableHeaderCell scope="row">{teamStatusMapping[team]}</CTableHeaderCell>
                                                    <CTableDataCell>{CATEGORY_MAP[teamMemberInfo.representingCategory]}</CTableDataCell>
                                                    <CTableDataCell>{teamMemberInfo.name}</CTableDataCell>
                                                    <CTableDataCell>{teamMemberInfo.score}</CTableDataCell>
                                                </CTableRow>
                                            ));
                                        })
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
                            <strong>US Team</strong> - Females
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Team Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Average Final Score</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {Object.values(femaleTeam).flat().length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan={4} className="text-center text-muted">
                                                No athletes on the team yet.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        Object.entries(femaleTeam).map(([team, teamMembers]) => {
                                            const teamStatusMapping = {
                                                aTeam: "A Team",
                                                bTeam: "B Team",
                                                cTeam: "C Team"
                                            };

                                            return teamMembers.map((teamMemberInfo) => (
                                                <CTableRow key={`${team}-${teamMemberInfo.name}`}>
                                                    <CTableHeaderCell scope="row">{teamStatusMapping[team]}</CTableHeaderCell>
                                                    <CTableDataCell>{CATEGORY_MAP[teamMemberInfo.representingCategory]}</CTableDataCell>
                                                    <CTableDataCell>{teamMemberInfo.name}</CTableDataCell>
                                                    <CTableDataCell>{teamMemberInfo.score}</CTableDataCell>
                                                </CTableRow>
                                            ));
                                        })
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

export default USTeam
