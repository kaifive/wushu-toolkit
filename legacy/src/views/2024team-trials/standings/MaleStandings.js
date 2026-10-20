import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CAlert,
    CAlertLink,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CButton,
} from '@coreui/react'

import { getData } from '../helpers/getData.js'

import { sortStandings } from '../helpers/sortStandings.js'

const MaleStandings = () => {
    const [groupFilter, setGroupFilter] = useState("");

    const [dataState, setDataState] = useState({ athleteData: {}, schools: [], loading: true, error: null });

    useEffect(() => {
        const fetchData = () => {
            getData()
                .then((athleteData) => {
                    setDataState(athleteData);
                })
                .catch((error) => {
                    setDataState({ athleteData: {}, schools: [], loading: true, error: null });
                });
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [setDataState, setInterval]);

    const { athleteData, loading, error, syncDate } = dataState;

    const sortedMaleStandings = sortStandings(athleteData).filter((athlete) => athlete.gender === 'Male');

    const aGroup = sortedMaleStandings.filter((athlete) => athlete.group === 'A');
    const bGroup = sortedMaleStandings.filter((athlete) => athlete.group === 'B');
    const cGroup = sortedMaleStandings.filter((athlete) => athlete.group === 'C');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <CAlert color="danger">
                An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen and check the <CAlertLink href="https://bowuu.com/all-results" target="_blank">Official Total Scores</CAlertLink>.
            </CAlert>
        )
    }

    let standingTables = null;

    if (groupFilter === "") {
        standingTables = (
            <>
                <CRow>
                    <CCol xs={12}>
                        <AGroupStandingsTable
                            standings={aGroup}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs={12}>
                        <BGroupStandingsTable
                            standings={bGroup}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs={12}>
                        <CGroupStandingsTable
                            standings={cGroup}
                        />
                    </CCol>
                </CRow>
            </>
        )
    } else if (groupFilter === "A") {
        standingTables = (
            <>
                <CRow>
                    <CCol xs={12}>
                        <AGroupStandingsTable
                            standings={aGroup}
                        />
                    </CCol>
                </CRow>
            </>
        )
    } else if (groupFilter === "B") {
        standingTables = (
            <>
                <CRow>
                    <CCol xs={12}>
                        <BGroupStandingsTable
                            standings={bGroup}
                        />
                    </CCol>
                </CRow>
            </>
        )
    } else if (groupFilter === "C") {
        standingTables = (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CGroupStandingsTable
                            standings={cGroup}
                        />
                    </CCol>
                </CRow>
            </>
        )
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Standings as of {syncDate}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Standing Filters</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Group: </CInputGroupText>
                                    <CFormSelect
                                        value={groupFilter}
                                        onChange={(event) => setGroupFilter(event.target.value)}>
                                        <option value="">*</option>
                                        <option value="A">A Group</option>
                                        <option value="B">B Group</option>
                                        <option value="C">C Group</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setGroupFilter("");
                                    }}>
                                    Reset Filter
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {standingTables}
        </>
    )
}

const AGroupStandingsTable = ({ standings }) => {
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Live Standings</strong> - Male | A Group
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Team Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                            <CTableHeaderCell scope="col">School</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Final Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {standings.map((data, idx) => {
                            let teamStatus = "#" + (idx + 1);

                            if (idx >= 0 && idx < 3) {
                                teamStatus = "A Team";
                            } else if (idx >= 3 && idx < 6) {
                                teamStatus = "B Team";
                            } else if (idx >= 6 && idx < 9) {
                                teamStatus = "C Team";
                            }

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>{data.athlete}</CTableDataCell>
                                    <CTableDataCell>{data.school}</CTableDataCell>
                                    <CTableDataCell>{data.finalScore}</CTableDataCell>
                                </CTableRow>
                            )
                        }
                        )}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

const BGroupStandingsTable = ({ standings }) => {
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Live Standings</strong> - Male | B Group
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Team Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                            <CTableHeaderCell scope="col">School</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Final Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {standings.map((data, idx) => {
                            let teamStatus = "#" + (idx + 1);

                            if (idx >= 0 && idx < 2) {
                                teamStatus = "A Team";
                            } else if (idx >= 2 && idx < 4) {
                                teamStatus = "B Team";
                            } else if (idx >= 4 && idx < 6) {
                                teamStatus = "C Team";
                            }

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>{data.athlete}</CTableDataCell>
                                    <CTableDataCell>{data.school}</CTableDataCell>
                                    <CTableDataCell>{data.finalScore}</CTableDataCell>
                                </CTableRow>
                            )
                        }
                        )}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

const CGroupStandingsTable = ({ standings }) => {
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Live Standings</strong> - Male | C Group
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Team Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                            <CTableHeaderCell scope="col">School</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Final Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {standings.map((data, idx) => {
                            let teamStatus = "#" + (idx + 1);

                            if (idx >= 0 && idx < 2) {
                                teamStatus = "A Team";
                            } else if (idx >= 2 && idx < 4) {
                                teamStatus = "B Team";
                            } else if (idx >= 4 && idx < 6) {
                                teamStatus = "C Team";
                            }

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>{data.athlete}</CTableDataCell>
                                    <CTableDataCell>{data.school}</CTableDataCell>
                                    <CTableDataCell>{data.finalScore}</CTableDataCell>
                                </CTableRow>
                            )
                        }
                        )}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default MaleStandings
