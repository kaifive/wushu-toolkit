import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
    CAlertLink,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CButton,
    CWidgetStatsB,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'

import { PieChart } from '@mui/x-charts/PieChart';

import { getData } from '../helpers/getData.js'
import { sortStandings } from '../helpers/sortStandings.js'
import { calculatePercentage } from '../helpers/calculatePercentage.js'
import { eventTypes } from '../helpers/eventTypes.js'

const EventDashboard = () => {
    const [typeFilter, setTypeFilter] = useState("")
    const [eventFilter, setEventFilter] = useState("")

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

    const { athleteData, loading, error, syncDate } = dataState;

    let filteredStandings = sortStandings(athleteData);

    const countOfAllMaleAthletes = filteredStandings.filter((athlete) => athlete.gender === "Male").length;
    const countOfAllFemaleAthletes = filteredStandings.filter((athlete) => athlete.gender === "Female").length;

    let filteredEvents = eventTypes;

    if (typeFilter !== "") {
        filteredEvents = filterJSONObject(eventTypes, typeFilter);
    }

    if (eventFilter !== "") {
        filteredStandings = filteredStandings.filter((athlete) =>
            athlete.events.some((event) => event.form === eventFilter)
        );
    }

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

    let dashboardBody = null;

    if (eventFilter === "") {
        dashboardBody =
            <CAlert color="danger">Select an Event.</CAlert>
    } else {
        let maleAthletes = [];
        let femaleAthletes = [];

        filteredStandings.forEach((athlete) => {
            if (athlete.gender === 'Male') {
                maleAthletes.push(athlete);
            } else if (athlete.gender === 'Female') {
                femaleAthletes.push(athlete);
            }
        });

        dashboardBody = <>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        color="white"
                        progress={{ value: calculatePercentage(maleAthletes.length, countOfAllMaleAthletes) }}
                        text=""
                        title="Number of Male Athletes"
                        value={`${maleAthletes.length} / ${countOfAllMaleAthletes}`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        color="white"
                        progress={{ value: calculatePercentage(calculateAverageScoreInEvent(maleAthletes, eventFilter), 10) }}
                        text=""
                        title="Average Barehand Score"
                        value={`${calculateAverageScoreInEvent(maleAthletes, eventFilter)} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        color="white"
                        progress={{ value: calculatePercentage(femaleAthletes.length, countOfAllFemaleAthletes) }}
                        text=""
                        title="Number of Female Athletes"
                        value={`${femaleAthletes.length} / ${countOfAllFemaleAthletes}`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        color="white"
                        progress={{ value: calculatePercentage(calculateAverageScoreInEvent(femaleAthletes, eventFilter), 10) }}
                        text=""
                        title="Average Long Weapon Score"
                        value={`${calculateAverageScoreInEvent(femaleAthletes, eventFilter)} / 10.00`}
                    />
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>School Breakdown of Event Male Athletes</strong></CCardHeader>
                        <CCardBody>
                            <PieChartBuilder
                                dataset={maleAthletes}
                                event={eventFilter}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Athlete Long Weapon Score Comparison</strong></CCardHeader>
                        <CCardBody>
                            <PieChartBuilder
                                dataset={femaleAthletes}
                                event={eventFilter}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>{eventFilter}</strong> - Male</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Score</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getRankings(maleAthletes, eventFilter).map((data, idx) => (
                                        <CTableRow key={`${idx}_male`}>
                                            <CTableDataCell>{data.rank}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                            <CTableDataCell>{data.name}</CTableDataCell>
                                            <CTableDataCell>{data.score}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>{eventFilter}</strong> - Female</CCardHeader>
                        <CCardBody>
                        <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Score</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getRankings(femaleAthletes, eventFilter).map((data, idx) => (
                                        <CTableRow key={`${idx}_female`}>
                                            <CTableDataCell>{data.rank}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                            <CTableDataCell>{data.name}</CTableDataCell>
                                            <CTableDataCell>{data.score}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
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
                                    <CInputGroupText style={{ width: "75px" }}>Type: </CInputGroupText>
                                    <CFormSelect
                                        value={typeFilter}
                                        onChange={(event) => {
                                            setTypeFilter(event.target.value)
                                            setEventFilter("")
                                        }}>
                                        <option value="">*</option>
                                        {[...new Set(Object.values(eventTypes))].map((type, idx) => (
                                            <option key={idx} value={type}>{type}</option>
                                        ))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Event: </CInputGroupText>
                                    <CFormSelect
                                        value={eventFilter}
                                        onChange={(event) => setEventFilter(event.target.value)}>
                                        <option value="">*</option>
                                        {Object.keys(filteredEvents).sort().map((event, idx) => (
                                            <option key={idx} value={event}>{event}</option>
                                        ))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setTypeFilter("");
                                        setEventFilter("");
                                    }}>
                                    Reset Filters
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {dashboardBody}
        </>
    )
}

const PieChartBuilder = ({ dataset, event }) => {
    let dataJSON = {};

    dataset.map((d) => {
        d.events.map((e) => {
            if (e.form === event) {
                if (!dataJSON[d.school]) {
                    dataJSON[d.school] = 0;
                }

                dataJSON[d.school] += 1;
            }
        })
    })

    let data = [];

    Object.entries(dataJSON).forEach(([key, value]) => {
        data.push({
            value: value,
            label: key
        })
    });

    return (
        <PieChart
            margin={{left: 80}}
            series={[
                {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
            ]}
            height={300}
            slotProps={{
                legend: {
                    hidden: true,
                },
            }}
        />
    )
}

const filterJSONObject = (obj, valueToMatch) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value === valueToMatch)
    );
};

function calculateAverageScoreInEvent(data, event) {
    let totalScore = 0;
    let count = 0;

    data.map((d) => {
        d.events.map((e) => {
            if (e.form === event) {
                totalScore += e.score;
                count++;
            }
        })
    })

    const averageScore = count !== 0 ? totalScore / count : 0;

    return Math.round(averageScore * 100) / 100;
}

function getRankings(dataset, event) {
    let result = [];

    dataset.map((data) => {
        data.events.map((e) => {
            if (e.form === event) {
                result.push({
                    school: data.school,
                    name: data.athlete,
                    score: e.score
                })

            }
        })
    })

    result = result.sort((a, b) => b.score - a.score);

    result.map((r, idx) => {
        r.rank = idx + 1;
    })

    return result;
}

export default EventDashboard
