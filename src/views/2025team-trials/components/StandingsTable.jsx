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
import { useAdults2025 } from '../context/Adults2025Context.jsx';

const StandingsTable = ({
    gender,
    category,
    data
}) => {
    const adults25Context = useAdults2025();
    const { filters, setFilters } = adults25Context

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
                            {category.split(",").length > 2 && (
                                <CTableHeaderCell scope="col">
                                    Weapon 2 ({EVENT_ABBREVIATIONS[category.split(",")[2].trim()]})
                                </CTableHeaderCell>
                            )}
                            <CTableHeaderCell scope="col">Avg. Score</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {Object.values(data).map((registration, idx) => {
                            const teamStatus = "#" + (idx + 1);
                            const categories = category.split(",").map((c) => c.trim());

                            // Map category → matching event (or undefined)
                            const categoryEvents = categories.map((cat) =>
                                registration.events.find((event) => event.event.includes(cat))
                            );

                            const totalScore = categoryEvents.reduce(
                                (sum, event) => sum + (event?.score ?? 0),
                                0
                            );

                            const formattedTotalScore = totalScore.toFixed(3);

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>{registration.competitor.name}</CTableDataCell>

                                    {categoryEvents.map((event, i) => (
                                        <CTableDataCell key={i}>
                                            {event && event.nandu ? (
                                                <a
                                                    href="#/2025-adults/scorecard"
                                                    onClick={(e) => {
                                                        setFilters({
                                                            genderFilter: window.location.hash.includes("male") ? "MALES" : "FEMALES",
                                                            categoryFilter: filters.categoryFilter,
                                                            eventFilter: event.event.split(" ")[event.event.split(" ").length - 1],
                                                            athleteFilter: registration.competitor.name,
                                                        })
                                                    }}
                                                >
                                                    {(event.score ?? 0).toFixed(3)}
                                                </a>
                                            ) : (
                                                <p>{event ? (event.score ?? 0).toFixed(3) : "-"}</p>
                                            )}
                                        </CTableDataCell>
                                    ))}

                                    <CTableDataCell>{formattedTotalScore}</CTableDataCell>
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
