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
    CFormInput
} from '@coreui/react'

import { getData } from '../helpers/getData.js'
import { sortStandings } from '../helpers/sortStandings.js'

const TotalScores2024 = () => {
    const [genderFilter, setGenderFilter] = useState("")
    const [groupFilter, setGroupFilter] = useState("")
    const [schoolFilter, setSchoolFilter] = useState("")
    const [athleteFilter, setAthleteFilter] = useState("")

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
    }, [setDataState]);

    const { athleteData, schools, loading, error, syncDate } = dataState;

    const sortedAthleteData = sortStandings(athleteData);

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

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Scores as of {syncDate}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Total Score Filters</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Gender: </CInputGroupText>
                                    <CFormSelect
                                        value={genderFilter}
                                        onChange={(event) => setGenderFilter(event.target.value)}>
                                        <option value="">*</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Group: </CInputGroupText>
                                    <CFormSelect
                                        value={groupFilter}
                                        onChange={(event) => setGroupFilter(event.target.value)}>
                                        <option value="">*</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>School: </CInputGroupText>
                                    <CFormSelect
                                        value={schoolFilter}
                                        onChange={(event) => setSchoolFilter(event.target.value)}>
                                        <option value="">*</option>
                                        {schools.map((school, idx) => (
                                            <option key={idx} value={school}>{school}</option>
                                        ))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Athlete: </CInputGroupText>
                                    <CFormInput
                                        value={athleteFilter}
                                        onChange={(event) => setAthleteFilter(event.target.value)}>
                                    </CFormInput>
                                </CInputGroup>
                            </CRow>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setGenderFilter("");
                                        setGroupFilter("");
                                        setSchoolFilter("");
                                        setAthleteFilter("");
                                    }}>
                                    Reset Filters
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Total Scores</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Final Score</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Barehand Scores</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Weapon Scores</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {Object.entries(sortedAthleteData).map(([key, data]) => {
                                        const tempEventData = data.events.sort((a, b) => b.score - a.score);

                                        const barehandScores = [];
                                        const weaponScores = [];

                                        tempEventData.map((event) => {
                                            if (event.class === "Barehand") {
                                                barehandScores.push(event.type + " - " + event.score)
                                            } else {
                                                weaponScores.push(event.type + " - " + event.score)
                                            }
                                        })

                                        if ((data.group === groupFilter || groupFilter === "") &&
                                            (data.gender === genderFilter || genderFilter === "") &&
                                            (data.school === schoolFilter || schoolFilter === "") &&
                                            data.athlete.toLowerCase().includes(athleteFilter.toLowerCase())) {
                                            return (
                                                <CTableRow key={key}>
                                                    <CTableDataCell>{data.group}</CTableDataCell>
                                                    <CTableDataCell>{data.gender}</CTableDataCell>
                                                    <CTableDataCell>{data.school}</CTableDataCell>
                                                    <CTableDataCell>{data.athlete}</CTableDataCell>
                                                    <CTableDataCell>{data.finalScore}</CTableDataCell>
                                                    <CTableDataCell>{barehandScores.join(", ")}</CTableDataCell>
                                                    <CTableDataCell>{weaponScores.join(", ")}</CTableDataCell>
                                                </CTableRow>
                                            )
                                        }
                                    }
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

export default TotalScores2024
