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
} from '@coreui/react'

import { determineUSTeam } from '../utils/determineUSTeam'

import { NOVA_WUSHU_ATHLETES } from '../constants.js';

const USTeamTable = ({
    gender,
    group,
    data
}) => {
    const teams = determineUSTeam(data, group);

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>US Team</strong> - {gender} | {group} Group
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Team Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Discipline</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Total Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {Object.entries(teams).map(([teamLevel, athletes]) => (
                            <React.Fragment key={teamLevel}>
                                {athletes.map((athlete) => (
                                    <CTableRow key={athlete.athleteName} color={NOVA_WUSHU_ATHLETES.includes(athlete.athleteName) ? "primary" : ""}>
                                        <CTableHeaderCell scope="row">
                                            {teamLevel} Team
                                        </CTableHeaderCell>
                                        <CTableDataCell>
                                            {athlete.athleteName}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {athlete.topDiscipline}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {parseFloat(athlete.totalScores).toFixed(3)}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default USTeamTable