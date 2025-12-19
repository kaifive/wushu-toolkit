import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'

import { useSportdata } from '../sportdataComponents/context/SportdataContext.jsx';

import { parseScheduleData } from './utils/parseScheduleData.js'

import { NOVA_WUSHU_ATHLETES } from './constants.js';

const apiUrl = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';

const Juniors2025Schedule = () => {
    const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
    const [scheduleData, setScheduleData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${apiUrl}/proxy?url=https://usawkf.org/2025TT/JuniorTaoluOrder.php`);
            const text = await data.text();
            setScheduleData(parseScheduleData(text));
            setIsLoadingSchedule(false);
        };

        fetchData();
    }, []);

    const sportdataContext = useSportdata();
    const { data, filters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

    if (isLoading || isLoadingSchedule) {
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
                    <CAlert color="info">Schedule and Scores as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            {scheduleData && (
                scheduleData.sessions.map((session, index) => (
                    <CRow key={index} className="mb-4">
                        <CCol xs={12}>
                            <SessionCard session={session} />
                        </CCol>
                    </CRow>
                ))
            )}
        </>
    )
}

const SessionCard = ({ session }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const sportdataContext = useSportdata();
    const { data, filters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

    return (
        <CCard className="mb-4">
            <CCardHeader
                style={{ cursor: 'pointer' }}
                onClick={() => setIsExpanded(prev => !prev)}
            >
                <strong>{session.name}</strong> - {averageScoreBySession(session, athleteData)} {isExpanded ? "▾" : "▸"}
            </CCardHeader>
            {isExpanded && (
                <CCardBody>
                    <CRow>
                        {session.rings.map((ring, ringIndex) => (
                            <CCol xs={12} md={6} key={ringIndex} className="mb-4">
                                <RingCard ring={ring} />
                            </CCol>
                        ))}
                    </CRow>
                </CCardBody>
            )}
        </CCard>
    )
}

const RingCard = ({ ring }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const sportdataContext = useSportdata();
    const { data, filters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

    return (
        <CCard className="mb-4">
            <CCardHeader
                style={{ cursor: 'pointer' }}
                onClick={() => setIsExpanded(prev => !prev)}
            >
                <strong>Ring {ring.ringNumber}</strong> - {averageScoreByRing(ring, athleteData)} {isExpanded ? "▾" : "▸"}
            </CCardHeader>
            {isExpanded && (
                <CCardBody>
                    {ring.events.map((event, eventIndex) => (
                        <EventCard key={eventIndex} event={event} />
                    ))}
                </CCardBody>
            )}
        </CCard>
    )
}

const EventCard = ({ event }) => {
    const sportdataContext = useSportdata();
    const { data } = sportdataContext

    const { athleteData } = data

    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        const scores = event.athletes.map((eventInfo) => {
            const sanitizedAthleteName = eventInfo.name.replace(/_/g, " ")

            const finalScore = getAthleteEventScore(sanitizedAthleteName, event.category, athleteData);
            return parseFloat(finalScore);
        });

        const hasZeroScores = scores.some(score => score === 0.000);
        const hasNonZeroScores = scores.some(score => score !== 0.000);

        const isMixed = hasZeroScores && hasNonZeroScores;

        // setExpanded(isMixed);
    }, [event, athleteData]);

    let simpleEventName = event.category.replace(/(Youth|Junior|Children)/gi, '').trim();
    simpleEventName = simpleEventName.replace(/3rd Set/gi, 'A Group').trim();
    simpleEventName = simpleEventName.replace(/1st Set/gi, 'B Group').trim();
    simpleEventName = simpleEventName.replace(/Elementary/gi, 'C Group').trim();

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpanded(prev => !prev)}
                >
                    <strong>{simpleEventName}</strong> - {averageScoreByEvent(event, athleteData)} {expanded ? "▾" : "▸"}
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
                                {event.athletes.map((data) => {
                                    const sanitizedAthleteName = data.name.replace(/_/g, " ")

                                    const finalScore = getAthleteEventScore(sanitizedAthleteName, event.category, athleteData);

                                    let matchedName = ""

                                    return (
                                        <CTableRow key={`${data.name.toLowerCase()}`} color={NOVA_WUSHU_ATHLETES.includes(sanitizedAthleteName) ? "primary" : ""}>
                                            <CTableHeaderCell>{data.order}</CTableHeaderCell>
                                            <CTableDataCell>{sanitizedAthleteName}</CTableDataCell>
                                            <CTableDataCell>
                                                {finalScore.toFixed(3)}
                                            </CTableDataCell>
                                        </CTableRow>
                                    )
                                })}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                )}
            </CCard>
        </>
    )
}

function getAthleteEventScore(athleteName, event, athleteData) {
    const athleteNameKeyArr = athleteName.toLowerCase().split(' ')

    const eventInfoLower = event.toLowerCase();

    let ageGroup = "";
    if (eventInfoLower.includes("youth")) {
        ageGroup = "A";
    } else if (eventInfoLower.includes("junior")) {
        ageGroup = "B";
    } else if (eventInfoLower.includes("child")) {
        ageGroup = "C";
    }

    const lastElement = athleteNameKeyArr.pop();
    athleteNameKeyArr.unshift(lastElement); // Move last name to front
    const athleteNameKey = `${athleteNameKeyArr.join(' ')}_${ageGroup}`;
    const individualAthleteData = athleteData[athleteNameKey]

    if (!individualAthleteData) {
        console.log("No athlete data found for:", athleteNameKey);
        return 0.000;
    }

    let finalScore;

    if (individualAthleteData) {
        Object.values(individualAthleteData.events).forEach((registration) => {
            if (registration.eventInfo.includes(event)) {
                finalScore = parseFloat(registration.finalScore);
            }
        });
    }

    if (!finalScore && finalScore !== 0) {
        finalScore = 0.000;
        console.log("No score found for:", athleteName, "in event:", event);
    }

    return finalScore;
}

function averageScoreByEvent(event, athleteData) {
    const scores = event.athletes.map((athleteInfo) => {
        const sanitizedAthleteName = athleteInfo.name.replace(/_/g, " ")

        const finalScore = getAthleteEventScore(sanitizedAthleteName, event.category, athleteData);

        return parseFloat(finalScore);
    });

    const validScores = scores.filter(score => score > 0);

    if (validScores.length === 0) {
        return "(0.000)";
    }

    const totalScore = validScores.reduce((acc, score) => acc + score, 0);
    return `(${(totalScore / validScores.length).toFixed(3)})`;
}

function averageScoreByRing(ring, athleteData) {
    const allScores = [];

    ring.events.forEach((event) => {
        const eventAverage = averageScoreByEvent(event, athleteData);
        const numericAverage = parseFloat(eventAverage.replace(/[()]/g, ''));
        if (!isNaN(numericAverage) && numericAverage > 0) {
            allScores.push(numericAverage);
        }
    });

    if (allScores.length === 0) {
        return "(0.000)";
    }

    const totalScore = allScores.reduce((acc, score) => acc + score, 0);
    return `(${(totalScore / allScores.length).toFixed(3)})`;
}

function averageScoreBySession(session, athleteData) {
    const allScores = [];

    session.rings.forEach((ring) => {
        ring.events.forEach((event) => {
            const eventAverage = averageScoreByEvent(event, athleteData);
            const numericAverage = parseFloat(eventAverage.replace(/[()]/g, ''));
            if (!isNaN(numericAverage) && numericAverage > 0) {
                allScores.push(numericAverage);
            }
        });
    });

    if (allScores.length === 0) {
        return "(0.000)";
    }

    const totalScore = allScores.reduce((acc, score) => acc + score, 0);
    return `(${(totalScore / allScores.length).toFixed(3)})`;
}

export default Juniors2025Schedule
