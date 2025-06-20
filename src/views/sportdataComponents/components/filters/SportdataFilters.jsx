import React, { useEffect, useState } from 'react'
import {
    CRow,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CButton,
} from '@coreui/react'

import { useSportdata } from '../../context/SportdataContext';

import { EVENT_ABBREVIATIONS } from '../../lookups/eventAbbreviations';
import { CATEGORY_MAP } from '../../lookups/categoryMap';

const SportdataFilters = ({
    showGenderFilter,
    showCategoryFilter,
    showEventFilter,
    showAthleteFilter,
}) => {
    const sportdataContext = useSportdata();

    const { data, filters, setFilters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

    const [eventValues, setEventValues] = useState([
        <option key="*" value="">*</option>,
        ...Object.entries(EVENT_ABBREVIATIONS).map(([event, abbreviation], idx) => (
            <option key={idx} value={event.trim()}>{event.trim()}</option>
        ))
    ])

    const [athleteValues, setAthleteValues] = useState([
        <option key="*" value="">*</option>
    ])

    useEffect(() => {
        if (filters.categoryFilter.length === 0) {
            setEventValues([
                <option key="*" value="">*</option>,
                ...Object.entries(EVENT_ABBREVIATIONS).map(([event, abbreviation], idx) => (
                    <option key={idx} value={event.trim()}>{event.trim()}</option>
                ))
            ])
        } else {
            setEventValues([
                <option key="*" value="">*</option>,
                ...CATEGORY_MAP[filters.categoryFilter].split(",").map((event, idx) => (
                    <option key={idx} value={event.trim()}>{event.trim()}</option>
                ))
            ])

            if (!filters.categoryFilter.includes(filters.eventFilter)) {
                setFilters((prev) => ({ ...prev, eventFilter: "" }));
            }
        }
    }, [filters.categoryFilter]);

    useEffect(() => {
        if (filters.athleteFilter.length === 0) {
            setEventValues([
                <option key="*" value="">*</option>,
                ...Object.entries(EVENT_ABBREVIATIONS).map(([event, abbreviation], idx) => (
                    <option key={idx} value={event.trim()}>{event.trim()}</option>
                ))
            ])
        } else {
            let athleteEvents = [];

            // Find the athlete and grab their events
            for (const gender of Object.keys(athleteData)) {
                for (const category of Object.keys(athleteData[gender])) {
                    const competitors = athleteData[gender][category];
                    if (filters.athleteFilter in competitors) {
                        athleteEvents.push(...competitors[filters.athleteFilter].events.map(e => e.event.split(" ")[e.event.split(" ").length - 1]));
                    }
                }
            }

            setEventValues([
                <option key="*" value="">*</option>,
                ...athleteEvents.map((event, idx) => (
                    <option key={idx} value={event}>{event}</option>
                ))
            ]);

            // Clear eventFilter if it's not one of this athlete's events
            if (!athleteEvents.includes(filters.eventFilter)) {
                setFilters((prev) => ({ ...prev, eventFilter: "" }));
            }
        }
    }, [filters.athleteFilter]);

    useEffect(() => {
        const competition = window.location.hash.split("/")[1]
        localStorage.setItem(`WushuToolkit-Sportdata-${competition}`, JSON.stringify(filters));

        let filteredAthleteData = structuredClone(athleteData);

        const { genderFilter, categoryFilter, eventFilter } = filters;

        // Step 1: Filter by gender
        if (genderFilter.length > 0) {
            filteredAthleteData = {
                [genderFilter]: filteredAthleteData[genderFilter] || {},
            };
        }

        // Step 2: Filter by category
        Object.entries(filteredAthleteData).forEach(([gender, categories]) => {
            if (categoryFilter.length > 0) {
                filteredAthleteData[gender] = {
                    [categoryFilter]: categories[categoryFilter] || {},
                };
            }
        });

        // Step 3: Filter by event
        if (eventFilter.length > 0) {
            Object.entries(filteredAthleteData).forEach(([gender, categories]) => {
                Object.entries(categories).forEach(([category, registrations]) => {
                    Object.entries(registrations).forEach(([competitor, registration]) => {
                        const hasEvent = registration.events?.some((e) =>
                            e.event.includes(eventFilter)
                        );
                        if (!hasEvent) {
                            delete filteredAthleteData[gender][category][competitor];
                        }
                    });
                });
            });
        }

        // Step 4: Build list of names
        const maleNames = Object.entries(filteredAthleteData["MALES"] || {})
            .flatMap(([_, competitors]) => Object.keys(competitors));

        const femaleNames = Object.entries(filteredAthleteData["FEMALES"] || {})
            .flatMap(([_, competitors]) => Object.keys(competitors));

        const uniqueMaleNames = Array.from(new Set(maleNames)).sort();
        const uniqueFemaleNames = Array.from(new Set(femaleNames)).sort();

        const uniqueNames = [...uniqueMaleNames, ...uniqueFemaleNames];

        setAthleteValues([
            <option value="" key="all">*</option>,
            ...uniqueNames.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
            ))
        ]);

        // Only reset athleteFilter if it's invalid
        if (!uniqueNames.includes(filters.athleteFilter)) {
            setFilters((prev) => ({ ...prev, athleteFilter: "" }));
        }
    }, [filters.genderFilter, filters.categoryFilter, filters.eventFilter, athleteData]);

    const handleGenderFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, genderFilter: e.target.value }));
    }

    const handleCategoryFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, categoryFilter: e.target.value }));
    }

    const handleEventFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, eventFilter: e.target.value }));
    }

    const handleAthleteFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, athleteFilter: e.target.value }));
    }

    return (
        <>
            {showGenderFilter && (
                <CRow>
                    <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "100px" }}>Gender: </CInputGroupText>
                        <CFormSelect
                            value={filters.genderFilter}
                            onChange={handleGenderFilterChange}
                        >
                            <option key="*" value="">*</option>
                            <option key="males" value="MALES">Male</option>
                            <option key="females" value="FEMALES">Female</option>
                        </CFormSelect>
                    </CInputGroup>
                </CRow>
            )}
            {showCategoryFilter && (
                <CRow>
                    <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "100px" }}>Category: </CInputGroupText>
                        <CFormSelect
                            value={filters.categoryFilter}
                            onChange={handleCategoryFilterChange}
                        >
                            <option key="*" value="">*</option>
                            <option key="cq_ds_gs" value="CQ_DS_GS">Changquan, Daoshu, Gunshu</option>
                            <option key="cq_js_qs" value="CQ_JS_QS">Changquan, Jianshu, Qiangshu</option>
                            <option key="nq_nd_ng" value="NQ_ND_NG">Nanquan, Nandao, Nangun</option>
                            <option key="tq_tj" value="TQ_TJ">Taijiquan, Taijijian</option>
                        </CFormSelect>
                    </CInputGroup>
                </CRow>
            )}
            {showEventFilter && (
                <CRow>
                    <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "100px" }}>Event: </CInputGroupText>
                        <CFormSelect
                            value={filters.eventFilter}
                            onChange={handleEventFilterChange}
                        >
                            {eventValues}
                        </CFormSelect>
                    </CInputGroup>
                </CRow>
            )}
            {showAthleteFilter && (
                <CRow>
                    <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "100px" }}>Athlete: </CInputGroupText>
                        <CFormSelect
                            value={filters.athleteFilter}
                            onChange={handleAthleteFilterChange}
                        >
                            {athleteValues}
                        </CFormSelect>
                    </CInputGroup>
                </CRow>
            )}
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                    style={{}}
                    color="primary"
                    onClick={() => {
                        setFilters({
                            genderFilter: showGenderFilter ? "" : filters.genderFilter,
                            categoryFilter: showCategoryFilter ? "" : filters.categoryFilter,
                            eventFilter: showEventFilter ? "" : filters.eventFilter,
                            athleteFilter: showAthleteFilter ? "" : filters.athleteFilter,
                        })
                    }}>
                    Reset
                </CButton>
            </div>
        </>
    )
}

export default SportdataFilters;
