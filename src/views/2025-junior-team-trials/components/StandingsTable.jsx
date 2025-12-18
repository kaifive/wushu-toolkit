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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
    cilMagnifyingGlass,
    cilCheckCircle
} from '@coreui/icons'

import { determineUSTeam } from '../utils/determineUSTeam'

const StandingsTable = ({
    gender,
    group,
    data
}) => {
    const sortedData = Object.values(data).sort((a, b) => b.totalScores - a.totalScores);
    const teams = determineUSTeam(data, group);
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Live Standings</strong> - {gender} | {group} Group
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Barehand</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Short Weapon</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Long Weapon</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Discipline</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Total Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {Object.values(sortedData).map((registration, idx) => {
                            let teamStatus = `#${idx + 1}`;
                            if (teams.A.find(a => a.athleteName === registration.athleteName)) {
                                teamStatus = "A Team";
                            } else if (teams.B.find(a => a.athleteName === registration.athleteName)) {
                                teamStatus = "B Team";
                            } else if (teams.C.find(a => a.athleteName === registration.athleteName)) {
                                teamStatus = "C Team";
                            }

                            const BAREHAND_ABBREVIATIONS = ["CQ", "NQ", "TQ"];
                            const SHORT_WEAPON_ABBREVIATIONS = ["DS", "JS", "ND", "TJ", "TS"]
                            const LONG_WEAPON_ABBREVIATIONS = ["GS", "QS", "NG"]

                            const barehandEvents = [];
                            const shortWeaponEvents = [];
                            const longWeaponEvents = [];

                            Object.entries(registration.events).map(([abbreviation, eventInfo]) => {
                                if (BAREHAND_ABBREVIATIONS.includes(eventInfo.abbreviation)) {
                                    barehandEvents.push(eventInfo);
                                } else if (SHORT_WEAPON_ABBREVIATIONS.includes(eventInfo.abbreviation)) {
                                    shortWeaponEvents.push(eventInfo);
                                } else if (LONG_WEAPON_ABBREVIATIONS.includes(eventInfo.abbreviation)) {
                                    longWeaponEvents.push(eventInfo);
                                }
                            })

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>
                                        {registration.athleteName}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {barehandEvents.map((event) => {
                                            return <div key={event.name}>{event.name} - {parseFloat(event.finalScore).toFixed(3)}</div>
                                        })}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {shortWeaponEvents.map((event) => {
                                            return <div key={event.name}>{event.name} - {parseFloat(event.finalScore).toFixed(3)}</div>
                                        })}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {longWeaponEvents.map((event) => {
                                            return <div key={event.name}>{event.name} - {parseFloat(event.finalScore).toFixed(3)}</div>
                                        })}
                                    </CTableDataCell>

                                    {/* {categoryEvents.map((event, i) => (
                                        <CTableDataCell key={i}>
                                            {event && event.nandu ? (
                                                <>
                                                    <a
                                                        href={`#/${competitionId}/scorecard`}
                                                        onClick={(e) => {
                                                            setFilters({
                                                                genderFilter: window.location.hash.includes("male") ? "MALES" : "FEMALES",
                                                                categoryFilter: filters.categoryFilter,
                                                                eventFilter: event.event.split(" ")[event.event.split(" ").length - 1],
                                                                athleteFilter: registration.competitor.name,
                                                            })
                                                        }}
                                                    >
                                                        {(event.finalScore ?? "0.000")}
                                                    </a>
                                                    <CTooltip content={event.nandu.join(", ")}>
                                                        <CIcon
                                                            icon={cilMagnifyingGlass}
                                                            size="sm"
                                                            className="ms-2"
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </CTooltip>
                                                </>
                                            ) : (
                                                <p>{event ? (event.finalScore ?? "0.000") : "-"}</p>
                                            )}
                                        </CTableDataCell>
                                    ))} */}
                                    <CTableDataCell>{registration.topDiscipline}</CTableDataCell>

                                    <CTableDataCell>{parseFloat(registration.totalScores).toFixed(3)}</CTableDataCell>
                                </CTableRow>
                            );
                        })}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default StandingsTable
