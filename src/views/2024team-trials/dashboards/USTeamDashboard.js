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
    CWidgetStatsB,
    useColorModes
} from '@coreui/react'

import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

import { getData } from '../helpers/getData.js'
import { sortStandings } from '../helpers/sortStandings.js'
import { calculatePercentage } from '../helpers/calculatePercentage.js'

const USTeamDashboard = () => {
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

    const sortedStandings = sortStandings(athleteData);

    const finalTeam = getTeam(sortedStandings);

    const maleFilteredStandings = finalTeam.filter((athlete) => athlete.gender === 'Male');
    const femaleFilteredStandings = finalTeam.filter((athlete) => athlete.gender === 'Female');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <CAlert color="danger">
                An error has occurred getting scores, refresh this page. If this problem continues to persist, check the <CAlertLink href="https://bowuu.com/all-results" target="_blank">Official Total Scores</CAlertLink>.
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
            <TeamTables
                finalTeam={finalTeam}
            />
            <SingleValueCharts
                maleFilteredStandings={maleFilteredStandings}
                femaleFilteredStandings={femaleFilteredStandings}
            />
            <BarehandTypeCharts
                maleFilteredStandings={maleFilteredStandings}
                femaleFilteredStandings={femaleFilteredStandings}
            />
            <WeaponDistribution
                filteredStandings={finalTeam}
            />
            <BreakdownBySchool
                maleFilteredStandings={maleFilteredStandings}
                femaleFilteredStandings={femaleFilteredStandings}
            />
        </>
    )
}

const TeamTables = ({ finalTeam }) => {
    return (
        <>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>A Team</strong> - Male</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getTeamByLevel(finalTeam, "A", "Male").map((data, idx) => (
                                        <CTableRow key={`${idx}_male`}>
                                            <CTableDataCell>{data.group} Group</CTableDataCell>
                                            <CTableDataCell>{data.athlete}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>A Team</strong> - Female</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getTeamByLevel(finalTeam, "A", "Female").map((data, idx) => (
                                        <CTableRow key={`${idx}_female`}>
                                            <CTableDataCell>{data.group} Group</CTableDataCell>
                                            <CTableDataCell>{data.athlete}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>B Team</strong> - Male</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getTeamByLevel(finalTeam, "B", "Male").map((data, idx) => (
                                        <CTableRow key={`${idx}_male`}>
                                            <CTableDataCell>{data.group} Group</CTableDataCell>
                                            <CTableDataCell>{data.athlete}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>B Team</strong> - Female</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getTeamByLevel(finalTeam, "B", "Female").map((data, idx) => (
                                        <CTableRow key={`${idx}_female`}>
                                            <CTableDataCell>{data.group} Group</CTableDataCell>
                                            <CTableDataCell>{data.athlete}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>C Team</strong> - Male</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getTeamByLevel(finalTeam, "C", "Male").map((data, idx) => (
                                        <CTableRow key={`${idx}_male`}>
                                            <CTableDataCell>{data.group} Group</CTableDataCell>
                                            <CTableDataCell>{data.athlete}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>C Team</strong> - Female</CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">School</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getTeamByLevel(finalTeam, "C", "Female").map((data, idx) => (
                                        <CTableRow key={`${idx}_female`}>
                                            <CTableDataCell>{data.group} Group</CTableDataCell>
                                            <CTableDataCell>{data.athlete}</CTableDataCell>
                                            <CTableDataCell>{data.school}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
        </>
    )
}

const SingleValueCharts = ({ maleFilteredStandings, femaleFilteredStandings }) => {
    return (
        <>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(maleFilteredStandings, "Barehand"), 10) }}
                        text="Top Barehand on the US Team"
                        title="Average Score of Males' "
                        value={`${calculateAverageClassScore(maleFilteredStandings, "Barehand")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(maleFilteredStandings, "Weapon"), 10) }}
                        text="Top Weapon on the US Team"
                        title="Average Score of Males' "
                        value={`${calculateAverageClassScore(maleFilteredStandings, "Weapon")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(femaleFilteredStandings, "Barehand"), 10) }}
                        text="Top Barehand on the US Team"
                        title="Average Score of Females'"
                        value={`${calculateAverageClassScore(femaleFilteredStandings, "Barehand")} / 10.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(femaleFilteredStandings, "Weapon"), 10) }}
                        text="Top Weapon on the US Team"
                        title="Average Score of Females' "
                        value={`${calculateAverageClassScore(femaleFilteredStandings, "Weapon")} / 10.00`}
                    />
                </CCol>
            </CRow>
            <br></br>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageCombinedScore(maleFilteredStandings), 20) }}
                        text="of Males' on the US Team"
                        title="Average Combined Score"
                        value={`${calculateAverageCombinedScore(maleFilteredStandings)} / 20.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: 100 }}
                        text="by Males on the US Team"
                        title="Average Number of Events"
                        value={`${calculateAverageNumberOfEvents(maleFilteredStandings)}`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: calculatePercentage(calculateAverageClassScore(femaleFilteredStandings, "Barehand"), 20) }}
                        text="of Females' on the US Team"
                        title="Average Combined Score"
                        value={`${calculateAverageCombinedScore(femaleFilteredStandings)} / 20.00`}
                    />
                </CCol>
                <CCol xs={12} sm={6} xl={3} xxl={3}>
                    <CWidgetStatsB
                        className="mb-3"
                        progress={{ value: 100 }}
                        text="by Females on the US Team"
                        title="Average Number of Events"
                        value={`${calculateAverageNumberOfEvents(femaleFilteredStandings)}`}
                    />
                </CCol>
            </CRow>
            <br></br>
        </>
    )
}

const BarehandTypeCharts = ({ maleFilteredStandings, femaleFilteredStandings }) => {
    return (
        <>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Top Barehand Type of Males on US Team</strong></CCardHeader>
                        <CCardBody>
                            <PieChartBuilder
                                dataset={maleFilteredStandings}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>Top Barehand Type of Females on US Team</strong></CCardHeader>
                        <CCardBody>
                            <PieChartBuilder
                                dataset={femaleFilteredStandings}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
        </>
    )
}

const WeaponDistribution = ({ filteredStandings }) => {
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

    return (
        <>
            <CRow>
                <CCol xs={12} sm={12} xl={12} xxl={12}>
                    <CCard>
                        <CCardHeader><strong>Top Weapon Type Distributions of Athletes on US Team</strong></CCardHeader>
                        <CCardBody>
                            <DoubleColumnBarChart
                                dataset={constructWeaponDistributionDataset(filteredStandings)}
                                chartSetting={chartSetting}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
        </>
    )
}

const DoubleColumnBarChart = ({ dataset, chartSetting }) => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
            series={[
                { dataKey: 'male', label: 'Male', color: "#3399ff" },
                { dataKey: 'female', label: 'Female', color: "#e55353" },
            ]}
            grid={{ horizontal: true }}
            {...chartSetting}
        />
    )
}

const BreakdownBySchool = ({ maleFilteredStandings, femaleFilteredStandings }) => {
    return (
        <>
            <CRow xs={{ gutter: 3 }}>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>US Team Breakdown by School</strong> - Male</CCardHeader>
                        <CCardBody>
                            <PieChartBuilder2
                                dataset={maleFilteredStandings}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12} sm={12} xl={6} xxl={6}>
                    <CCard>
                        <CCardHeader><strong>US Team Breakdown by School</strong> - Female</CCardHeader>
                        <CCardBody>
                            <PieChartBuilder2
                                dataset={femaleFilteredStandings}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <br></br>
        </>
    )
}

function getTeam(dataset) {
    const team = [];
    let aGroupMale = 0, aGroupFemale = 0, bGroupMale = 0, bGroupFemale = 0, cGroupMale = 0, cGroupFemale = 0;

    dataset.forEach((data) => {
        switch (data.group) {
            case "A":
                if (aGroupMale < 9 && data.gender === "Male") {
                    aGroupMale++;
                    team.push(data);
                } else if (aGroupFemale < 9 && data.gender === "Female") {
                    aGroupFemale++;
                    team.push(data);
                }
                break;
            case "B":
                if (bGroupMale < 6 && data.gender === "Male") {
                    bGroupMale++;
                    team.push(data);
                } else if (bGroupFemale < 6 && data.gender === "Female") {
                    bGroupFemale++;
                    team.push(data);
                }
                break;
            case "C":
                if (cGroupMale < 6 && data.gender === "Male") {
                    cGroupMale++;
                    team.push(data);
                } else if (cGroupFemale < 6 && data.gender === "Female") {
                    cGroupFemale++;
                    team.push(data);
                }
                break;
        }
    });

    return team;
}

function getTeamByLevel(team, teamLevel, gender) {
    let aGroup = [];
    let bGroup = [];
    let cGroup = [];

    team = team.filter((t) => t.gender === gender)

    let aGroupMale = 0, aGroupFemale = 0, bGroupMale = 0, bGroupFemale = 0, cGroupMale = 0, cGroupFemale = 0;

    team.forEach((data) => {
        switch (data.group) {
            case "A":
                if (aGroupMale < 3 && data.gender === "Male") {
                    aGroupMale++;
                } else if (aGroupFemale < 3 && data.gender === "Female") {
                    aGroupFemale++;
                }

                aGroup.push(data);
                break;
            case "B":
                if (bGroupMale < 2 && data.gender === "Male") {
                    bGroupMale++;
                } else if (bGroupFemale < 2 && data.gender === "Female") {
                    bGroupFemale++;
                }

                bGroup.push(data);
                break;
            case "C":
                if (cGroupMale < 2 && data.gender === "Male") {
                    cGroupMale++;
                } else if (cGroupFemale < 2 && data.gender === "Female") {
                    cGroupFemale++;
                }

                cGroup.push(data);
                break;
        }
    });

    let result = [];

    switch (teamLevel) {
        case "A":
            result.push(...aGroup.slice(0, 3));
            result.push(...bGroup.slice(0, 2));
            result.push(...cGroup.slice(0, 2));
            break;
        case "B":
            result.push(...aGroup.slice(3, 6));
            result.push(...bGroup.slice(2, 4));
            result.push(...cGroup.slice(2, 4));
            break;
        case "C":
            result.push(...aGroup.slice(6, 9));
            result.push(...bGroup.slice(2, 4));
            result.push(...cGroup.slice(2, 4));
            break;
    }

    return result;
}

function calculateAverageClassScore(filteredStandings, eventClass) {
    let totalScore = 0;
    let count = 0;

    filteredStandings.map((data) => {
        totalScore += data.topEvents[eventClass].score;
        count++;
    })

    const averageScore = count !== 0 ? totalScore / count : 0;

    return Math.round(averageScore * 100) / 100;
}

function calculateAverageCombinedScore(filteredStandings) {
    let totalScore = 0;
    let count = 0;

    filteredStandings.map((data) => {
        totalScore += data.finalScore
        count++;
    })

    const averageNumber = count !== 0 ? totalScore / count : 0;

    return Math.round(averageNumber * 100) / 100;
}

function calculateAverageNumberOfEvents(filteredStandings) {
    let totalNumber = 0;
    let count = 0;

    filteredStandings.map((data) => {
        totalNumber += data.events.length
        count++;
    })

    const averageNumber = count !== 0 ? totalNumber / count : 0;

    return Math.round(averageNumber * 100) / 100;
}

const PieChartBuilder = ({ dataset }) => {
    let dataJSON = {};

    dataset.map((d) => {
        if (!dataJSON[d.topEvents.Barehand.type]) {
            dataJSON[d.topEvents.Barehand.type] = 0;
        }

        dataJSON[d.topEvents.Barehand.type] += 1;

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
            margin={{ left: 80 }}
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

const PieChartBuilder2 = ({ dataset }) => {
    let dataJSON = {};

    dataset.map((d) => {
        if (!dataJSON[d.school]) {
            dataJSON[d.school] = 0;
        }

        dataJSON[d.school] += 1;

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
            margin={{ left: 80 }}
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

function constructWeaponDistributionDataset(filteredStandings) {
    let dataJSON = {};

    filteredStandings.map((data) => {
        if (!dataJSON[data.topEvents.Weapon.type]) {
            dataJSON[data.topEvents.Weapon.type] = {
                male: 0,
                female: 0,
                label: data.topEvents.Weapon.type,
            };
        }

        dataJSON[data.topEvents.Weapon.type][data.gender.toLowerCase()] += 1;
    })

    return Object.values(dataJSON);

}


export default USTeamDashboard
