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

import { EVENT_ABBREVIATIONS } from "../lookups/eventAbbreviations.js"

const StandingsTable = ({
    gender,
    category,
    data
}) => {
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Live Standings</strong> - {gender} | {category} Category
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Team Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Athlete</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Barehand ({EVENT_ABBREVIATIONS[category.split(",")[0].trim()]})</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Weapon 1 ({EVENT_ABBREVIATIONS[category.split(",")[1].trim()]})</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Weapon 2 ({EVENT_ABBREVIATIONS[category.split(",")[2].trim()]})</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Total Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {Object.values(data).map((registration, idx) => {
                            let teamStatus = "#" + (idx + 1);

                            let barehandEvent;
                            let weapon1Event;
                            let weapon2Event;

                            const categories = category.split(",").map((c) => c.trim());

                            registration.events.forEach((event) => {
                                if (event.event.includes(categories[0])) {
                                    barehandEvent = event;
                                } else if (event.event.includes(categories[1])) {
                                    weapon1Event = event;
                                } else if (event.event.includes(categories[2])) {
                                    weapon2Event = event;
                                }
                            });

                            const barehandScore = barehandEvent?.score;
                            const weapon1Score = weapon1Event?.score;
                            const weapon2Score = weapon2Event?.score;

                            const totalScore =
                                (barehandScore ?? 0) +
                                (weapon1Score ?? 0) +
                                (weapon2Score ?? 0);

                            const formattedTotalScore = totalScore.toFixed(3);

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>{registration.competitor.name}</CTableDataCell>
                                    <CTableDataCell>
                                        {barehandEvent && barehandEvent.nandu ? (
                                            <a
                                                href='#'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    alert(barehandEvent.nandu)
                                                }}
                                            >
                                                {(barehandScore || 0).toFixed(3)}
                                            </a>
                                        ) : (
                                            <p>{barehandEvent ? (barehandScore || 0).toFixed(3) : "-"}</p>
                                        )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {weapon1Event && weapon1Event.nandu ? (
                                            <a
                                                href='#'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    alert(barehandEvent.nandu)
                                                }}
                                            >
                                                {(weapon1Score || 0).toFixed(3)}
                                            </a>
                                        ) : (
                                            <p>{weapon1Event ? (weapon1Score || 0).toFixed(3) : "-"}</p>
                                        )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {weapon2Event && weapon2Event.nandu ? (
                                            <a
                                                href='#'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    alert(barehandEvent.nandu)
                                                }}
                                            >
                                                {(weapon2Score || 0).toFixed(3)}
                                            </a>
                                        ) : (
                                            <p>{weapon2Event ? (weapon2Score || 0).toFixed(3) : "-"}</p>
                                        )}
                                    </CTableDataCell>
                                    <CTableDataCell>{formattedTotalScore}</CTableDataCell>
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

export default StandingsTable
