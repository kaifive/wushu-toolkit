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
    useColorModes
} from '@coreui/react'

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

import { getData } from '../helpers/getData.js'
import { sortStandings } from '../helpers/sortStandings.js'
import { calculatePercentage } from '../helpers/calculatePercentage.js'

const HolisticDashboard = () => {
    const [genderFilter, setGenderFilter] = useState("")
    const [groupFilter, setGroupFilter] = useState("")
    const [schoolFilter, setSchoolFilter] = useState("")

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

    const { athleteData, schools, loading, error, syncDate } = dataState;

    let allStandings = sortStandings(athleteData);

    let filteredStandings = sortStandings(athleteData);

    if (genderFilter !== "") {
        filteredStandings = filteredStandings.filter((athlete) => athlete.gender === genderFilter)
    }

    if (groupFilter !== "") {
        filteredStandings = filteredStandings.filter((athlete) => athlete.group === groupFilter)
    }

    if (schoolFilter !== "") {
        filteredStandings = filteredStandings.filter((athlete) => athlete.school === schoolFilter)
    }

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
                            <strong>Holistic Dashboard Filters</strong>
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
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setGenderFilter("");
                                        setGroupFilter("");
                                        setSchoolFilter("");
                                    }}>
                                    Reset Filters
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(filteredStandings.length, allStandings.length) }}
                        text=""
                        title="Number of Athletes"
                        value={`${filteredStandings.length} / ${allStandings.length}`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(filteredStandings, "Barehand"), 10) }}
                        text=""
                        title="Average Barehand Score"
                        value={`${calculateAverageClassScore(filteredStandings, "Barehand")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(filteredStandings, "Short Weapon"), 10) }}
                        text=""
                        title="Average Short Weapon Score"
                        value={`${calculateAverageClassScore(filteredStandings, "Short Weapon")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(filteredStandings, "Long Weapon"), 10) }}
                        text=""
                        title="Average Long Weapon Score"
                        value={`${calculateAverageClassScore(filteredStandings, "Long Weapon")} / 10.00`}
                    />
                </CCol>
            </CRow>
            <br></br>
            <CRow>
                <CCol xs={12} sm={12} xl={12} xxl={12}>
                    <CCard>
                        <CCardHeader><strong>Number of Competitors by Barehand Events</strong></CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructMaleFemaleDatasetByClass(filteredStandings, "Barehand")}
                                type="Count"
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
                        <CCardHeader><strong>Number of Competitors by Short Weapon Events</strong></CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructMaleFemaleDatasetByClass(filteredStandings, "Short Weapon")}
                                type="Count"
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Number of Competitors by Long Weapon Events</strong></CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructMaleFemaleDatasetByClass(filteredStandings, "Long Weapon")}
                                type="Count"
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
            <CRow>
                <CCol xs={12} sm={12} xl={12} xxl={12}>
                    <CCard>
                        <CCardHeader><strong>Average Scores by Barehand Events</strong> <br></br>Total Average: {calculateAverageClassScore(filteredStandings, "Barehand")}</CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructMaleFemaleDatasetByClass(filteredStandings, "Barehand")}
                                type="Average"
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
                        <CCardHeader><strong>Average Scores by Short Weapon Events</strong><br></br>Total Average: {calculateAverageClassScore(filteredStandings, "Short Weapon")}</CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructMaleFemaleDatasetByClass(filteredStandings, "Short Weapon")}
                                type="Average"
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Average Scores by Long Weapon Events</strong><br></br>Total Average: {calculateAverageClassScore(filteredStandings, "Long Weapon")}</CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructMaleFemaleDatasetByClass(filteredStandings, "Long Weapon")}
                                type="Average"
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
                        <CCardHeader><strong>Top 10 Highest Combined Score</strong> - Male<br></br>Total Average: {calculateAverageCombinedScore(constructDatasetForTop10(filteredStandings, "Male"))}</CCardHeader>
                        <CCardBody>
                            <SingleColumnBarChart
                                dataset={constructDatasetForTop10(filteredStandings, "Male")}
                                gender="Male"
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Top 10 Highest Combined Score</strong> - Female<br></br>Total Average: {calculateAverageCombinedScore(constructDatasetForTop10(filteredStandings, "Female"))}</CCardHeader>
                        <CCardBody>
                            <SingleColumnBarChart
                                dataset={constructDatasetForTop10(filteredStandings, "Female")}
                                gender="Female"
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

const DoubleColumnBarChart = ({ dataset, type, chartSetting }) => {
    let max = null;

    if (type === "Average") {
        max = [{ max: 10 }];
    }

    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
            yAxis={max}
            series={[
                { dataKey: `male${type}`, label: 'Male', color: "#3399ff" },
                { dataKey: `female${type}`, label: 'Female', color: "#e55353" },
            ]}
            grid={{ horizontal: true }}
            {...chartSetting}
        />
    )
}

const SingleColumnBarChart = ({ dataset, gender, chartSetting }) => {
    const color = gender === "Male" ? "#3399ff" : "#e55353"

    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
            yAxis={[{ max: 20 }]}
            series={[
                { dataKey: 'score', label: "Combined Score", color: color },
            ]}
            grid={{ horizontal: true }}
            {...chartSetting}
        />
    )
}

function calculateAverageClassScore(filteredStandings, eventClass) {
    let totalScore = 0;
    let count = 0;

    filteredStandings.map((data) => {
        data.events.forEach((event) => {
            if (event.class === eventClass) {
                totalScore = totalScore + event.score;
                count++;
            }
        });
    })

    const averageScore = count !== 0 ? totalScore / count : 0;

    return Math.round(averageScore * 1000) / 1000;
}

function calculateAverageCombinedScore(top10Dataset) {
    let total = 0;
    let count = 0;

    top10Dataset.map((data) => {
        total += data.score;
        count++;
    })

    const averageScore = count !== 0 ? total / count : 0;

    return Math.round(averageScore * 1000) / 1000;
}


function constructMaleFemaleDatasetByClass(filteredStandings, eventClass) {
    let dataset = {};

    filteredStandings.map((data) => {
        data.events.map((event) => {
            if (event.class === eventClass) {
                if (!dataset[event.form]) {
                    dataset[event.form] = {
                        maleCount: 0,
                        femaleCount: 0,
                        maleTotal: 0,
                        femaleTotal: 0,
                        maleAverage: 0,
                        femaleAverage: 0,
                        label: `${data.group} - ${event.type}`
                    }
                }

                dataset[event.form][data.gender.toLowerCase() + "Count"] += 1
                dataset[event.form][data.gender.toLowerCase() + "Total"] += event.score
            }
        })
    })

    let dataArray = Object.values(dataset);

    dataArray.map((d) => {
        d.maleAverage = d.maleCount !== 0 ? Math.round((d.maleTotal / d.maleCount) * 1000) / 1000 : 0;
        d.femaleAverage = d.femaleCount !== 0 ? Math.round((d.femaleTotal / d.femaleCount) * 1000) / 1000 : 0;
    });

    return dataArray.sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
    });
}

function constructDatasetForTop10(filteredStandings, gender) {
    let dataset = [];

    const standings = filteredStandings.filter((athlete) => athlete.gender === gender)

    let size = 10;

    if (standings.length < 10) {
        size = standings.length;
    }

    for (let i = 0; i < size; i++) {
        const temp = {
            score: standings[i].finalScore,
            name: standings[i].athlete
        }

        dataset.push(temp);
    }

    return dataset;
}

export default HolisticDashboard
