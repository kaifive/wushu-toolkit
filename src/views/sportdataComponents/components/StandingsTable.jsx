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
    cilMagnifyingGlass
} from '@coreui/icons'


import { EVENT_ABBREVIATIONS } from "../lookups/eventAbbreviations.js"
import { useSportdata } from '../context/SportdataContext.jsx';

const StandingsTable = ({
    gender,
    category,
    data
}) => {
    const sportdataContext = useSportdata();
    const { filters, setFilters } = sportdataContext

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

                            const validScores = categoryEvents
                                .map(event => parseFloat(event?.finalScore))
                                .filter(score => !isNaN(score));

                            const average = validScores.length > 0
                                ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length
                                : 0;

                            const formattedAvgScore = average.toFixed(3);

                            const competitionId = window.location.hash.split("/")[1]

                            return (
                                <CTableRow key={idx}>
                                    <CTableHeaderCell scope="row">{teamStatus}</CTableHeaderCell>
                                    <CTableDataCell>{registration.competitor.name}</CTableDataCell>

                                    {categoryEvents.map((event, i) => (
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
                                                <p>{event ? (event.score ?? "0.000") : "-"}</p>
                                            )}
                                        </CTableDataCell>
                                    ))}

                                    <CTableDataCell>{formattedAvgScore}</CTableDataCell>
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
