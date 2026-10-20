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
    CWidgetStatsF,
    useColorModes
} from '@coreui/react'

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

import CIcon from '@coreui/icons-react'

import {
    cilChartPie
} from '@coreui/icons'

import { getData } from '../helpers/getData.js'
import { sortStandings } from '../helpers/sortStandings.js'
import { calculatePercentage } from '../helpers/calculatePercentage.js'

const AthleteDashboard = () => {
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
    }, [setDataState, setInterval]);

    const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    const darkModeStyles = colorMode === 'dark' ? {
        [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                stroke: 'white',
                strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
                fill: 'white',
            },
        },
        [`.MuiChartsGrid-horizontalLine`]: {
            stroke: 'white',
        },
        [`.MuiChartsLegend-series text`]: {
            color: 'white !important',
            fill: 'white !important',
        }
    } : {};

    const chartSetting = {
        height: 300,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
            ...darkModeStyles
        },
    };

    const { athleteData, schools, athletes, loading, error, syncDate } = dataState;

    let filteredAthletes = athletes;

    let filteredStandings = sortStandings(athleteData);

    if (schoolFilter !== "") {
        filteredStandings = filteredStandings.filter((athlete) => athlete.school === schoolFilter);
        filteredAthletes = filteredAthletes.filter((athlete) => athlete.school === schoolFilter);
    }

    if (athleteFilter !== "") {
        filteredStandings = filteredStandings.filter((athlete) => athlete.athlete === athleteFilter)
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

    filteredStandings = filteredStandings[0];

    let standingsInGroup = null;
    let standingsInGender = null;
    let standings = sortStandings(athleteData);;

    if (athleteFilter === "") {
        dashboardBody =
            <CAlert color="danger">Select an Athlete.</CAlert>
    } else {
        standingsInGroup = sortStandings(athleteData).filter((athlete) => athlete.group === filteredStandings.group);

        standingsInGroup = standingsInGroup.filter((athlete) => athlete.gender === filteredStandings.gender);

        standingsInGender = sortStandings(athleteData).filter((athlete) => athlete.gender === filteredStandings.gender);

        const teamSpots = filteredStandings.group === "A" ? 9 : 6;

        dashboardBody = <>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(filteredStandings.topEvents.Barehand.score, 10) }}
                        text={getTopFormByClass(filteredStandings, "Barehand")}
                        title="Top Barehand Score"
                        value={`${getTopScoreByClass(filteredStandings, "Barehand")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(getTopScoreByClass(filteredStandings, "Short Weapon"), 10) }}
                        text={getTopFormByClass(filteredStandings, "Short Weapon")}
                        title="Top Short Weapon Score"
                        value={`${getTopScoreByClass(filteredStandings, "Short Weapon")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(getTopScoreByClass(filteredStandings, "Long Weapon"), 10) }}
                        text={getTopFormByClass(filteredStandings, "Long Weapon")}
                        title="Top Long Weapon Score"
                        value={`${getTopScoreByClass(filteredStandings, "Long Weapon")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(filteredStandings.finalScore, 20) }}
                        text="Top Barehand + Top Weapon"
                        title="Combined Score"
                        value={`${filteredStandings.finalScore} / 20.00`}
                    />
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={4} xxl={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(standingsInGroup.length - getRanking(filteredStandings, standingsInGroup) + 1, standingsInGroup.length) }}
                        text="Ranking in Group & Gender"
                        value={`#${getRanking(filteredStandings, standingsInGroup)} of ${standingsInGroup.length}`}
                    />
                </CCol>
                <CCol xs={12} sm={12} xl={4} xxl={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(standingsInGender.length - getRanking(filteredStandings, standingsInGender) + 1, standingsInGender.length) }}
                        text="Ranking in Gender"
                        value={`#${getRanking(filteredStandings, standingsInGender)} of ${standingsInGender.length}`}
                    />
                </CCol>
                <CCol xs={12} sm={12} xl={4} xxl={4}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(standings.length - getRanking(filteredStandings, standings) + 1, standings.length) }}
                        text="Ranking in USA"
                        value={`#${getRanking(filteredStandings, standings)} of ${standings.length}`}
                    />
                </CCol>
            </CRow>
            <br></br>
            <CRow>
                <CCol xs={12} sm={12} xl={12} xxl={12}>
                    <CCard>
                        <CCardHeader><strong>Athlete Barehand Score Comparison</strong> <br></br>Average Overall Barehand Score in Group & Gender: {calculateAverageGroupAndGenderScoreByClass(standingsInGroup, "Barehand")}</CCardHeader>
                        <CCardBody>
                            <BarChartBuilder
                                dataset={constructComparisonDataset(filteredStandings, standings, "Barehand")}
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Athlete Short Weapon Score Comparison</strong><br></br>Average Overall Short Weapon Score in Group & Gender: {calculateAverageGroupAndGenderScoreByClass(standingsInGroup, "Short Weapon")}</CCardHeader>
                        <CCardBody>
                            <BarChartBuilder
                                dataset={constructComparisonDataset(filteredStandings, standings, "Short Weapon")}
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Athlete Long Weapon Score Comparison</strong><br></br>Average Overall Long Weapon Score in Group & Gender: {calculateAverageGroupAndGenderScoreByClass(standingsInGroup, "Long Weapon")}</CCardHeader>
                        <CCardBody>
                            <BarChartBuilder
                                dataset={constructComparisonDataset(filteredStandings, standings, "Long Weapon")}
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CWidgetStatsF
                        icon={<CIcon width={24} icon={cilChartPie} size="xl" />}
                        title="Average Barehand Score"
                        padding={false}
                        value={`${calculateAverageClassScore(filteredStandings, "Barehand")} / 10.00`}
                        color="primary"
                    />
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CWidgetStatsF
                        icon={<CIcon width={24} icon={cilChartPie} size="xl" />}
                        title="Average Weapon Score"
                        padding={false}
                        value={`${calculateAverageClassScore(filteredStandings, "Weapon")} / 10.00`}
                        color="primary"
                    />
                </CCol>
            </CRow>
            <br></br>
            {getRanking(filteredStandings, standingsInGroup) < teamSpots ? <CAlert color="primary"><strong>US Junior Wushu Team Standing</strong><br></br>Congratulations, {filteredStandings.athlete} is currently on the 2024 US Junior Wushu Team!</CAlert> : <CAlert color="warning"><strong>US Junior Wushu Team Standing</strong><br></br>Unfortunately, {filteredStandings.athlete} is currently not on the 2024 US Junior Wushu Team. </CAlert>}
            <br></br>
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
                                    <CInputGroupText style={{ width: "75px" }}>School: </CInputGroupText>
                                    <CFormSelect
                                        value={schoolFilter}
                                        onChange={(event) => {
                                            setSchoolFilter(event.target.value);
                                            setAthleteFilter("");
                                        }}>
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
                                    <CFormSelect
                                        value={athleteFilter}
                                        onChange={(event) => setAthleteFilter(event.target.value)}>
                                        <option value="">*</option>
                                        {filteredAthletes.map((athlete, idx) => (
                                            <option key={idx} value={athlete.name}>{athlete.name}</option>
                                        ))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
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
            {dashboardBody}
        </>
    )
}

const BarChartBuilder = ({ dataset, chartSetting }) => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
            yAxis={[{ max: 10 }]}
            series={[
                { dataKey: 'athlete', label: 'Athlete Score', color: "#1b9e3e" },
                { dataKey: 'group', label: 'Group Average', color: "#3399ff" },
                { dataKey: 'gender', label: 'Group & Gender Average', color: "#e55353" },
            ]}
            grid={{ horizontal: true }}
            {...chartSetting}
        />
    )
}

function getTopScoreByClass(athleteData, classType) {
    let max = 0;

    athleteData.events.map((event) => {
        if (event.class === classType && event.score > max) {
            max = event.score;
        }
    })

    return max;
}

function getTopFormByClass(athleteData, classType) {
    let max = 0;
    let form = "Not Applicable";

    athleteData.events.map((event) => {
        if (event.class === classType && event.score > max) {
            max = event.score;
            form = event.form;
        }
    })

    return form;
}

function getRanking(athleteData, dataset) {
    let ranking = 1;

    for (const data of dataset) {
        if (data.athlete === athleteData.athlete) {
            return ranking;
        } else {
            ranking += 1;
        }
    }

    return null;
}


function calculateAverageClassScore(filteredStandings, eventClass) {
    let totalScore = 0;
    let count = 0;

    filteredStandings.events.forEach((event) => {
        if (event.class.includes(eventClass)) {
            if (event.score !== 0) {
                totalScore = totalScore + event.score;
                count++;
            }
        }
    });

    const averageScore = count !== 0 ? totalScore / count : 0;

    return Math.round(averageScore * 1000) / 1000;
}

function constructComparisonDataset(filteredStandings, standings, classType) {
    let data = {};

    standings.map((athlete) => {
        if (athlete.group === filteredStandings.group) {
            athlete.events.map((event) => {
                if (event.class === classType) {
                    if (!data[event.form]) {
                        data[event.form] = {
                            groupTotalScore: 0,
                            groupCount: 0,
                            groupAverageCount: 0,
                            genderTotalScore: 0,
                            genderCount: 0,
                            genderAverageCount: 0,
                        }
                    }

                    if (athlete.gender === filteredStandings.gender) {
                        data[event.form].genderCount++;

                        if (event.score !== 0) {
                            data[event.form].genderTotalScore += event.score;
                            data[event.form].genderAverageCount++;
                        }
                    }

                    data[event.form].groupCount++;

                    if (event.score !== 0) {
                        data[event.form].groupTotalScore += event.score;
                        data[event.form].groupAverageCount++;
                    }
                }
            })
        }
    })

    let dataset = [];

    filteredStandings.events.map((event) => {
        if (event.class === classType) {
            dataset.push({
                label: event.form,
                athlete: event.score,
                group: data[event.form].groupAverageCount !== 0 ? Math.round((data[event.form].groupTotalScore / data[event.form].groupAverageCount) * 1000) / 1000 : 0,
                gender: data[event.form].genderAverageCount !== 0 ? Math.round((data[event.form].genderTotalScore / data[event.form].genderAverageCount) * 1000) / 1000 : 0,
            });
        }
    })

    return dataset;
}

function calculateAverageGroupAndGenderScoreByClass(standingsInGroup, classType) {
    let totalScore = 0;
    let count = 0;

    standingsInGroup.map((athlete) => {
        athlete.events.map((event) => {
            if (event.class === classType) {
                if (event.score !== 0) {
                    totalScore += event.score;
                    count++;
                }
            }
        })
    });

    const averageScore = count !== 0 ? totalScore / count : 0;

    return Math.round(averageScore * 1000) / 1000;
}

export default AthleteDashboard
