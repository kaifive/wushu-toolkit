import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
    CFormSelect,
    CInputGroup,
    CInputGroupText,    
} from '@coreui/react'

import { useSportdata } from '../../sportdataComponents/context/SportdataContext.jsx';
import { NOVA_WUSHU_ATHLETES } from '../constants.js';

import ScorecardDisplay from './ScorecardDisplay.jsx'

const Scorecard = () => {
    const sportdataContext = useSportdata();
    const { data, filters, setFilters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

    const [searchName, setSearchName] = useState("");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <CAlert color="danger">
                An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen.
            </CAlert>
        )
    }

    const novaWushuAthletes = Object.entries(athleteData).filter(([athleteName]) => NOVA_WUSHU_ATHLETES.includes(athleteName.split("_")[0]));

    const filteredAthletes = novaWushuAthletes.filter(([athleteName, athlete]) => {
        return athleteName.includes(searchName.toLowerCase());
    });

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Data as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Scorecard Selection</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>Search by Name</CInputGroupText>
                                <CFormSelect
                                    aria-label="Select Athlete"
                                    value={searchName}
                                    onChange={(e) => {
                                        const selectedName = e.target.value;
                                        setSearchName(selectedName);
                                    }}
                                >
                                    <option value="">All Athletes</option>
                                    {novaWushuAthletes.map((data) => (
                                        <option key={data[1].athleteName} value={data[1].athleteName}>
                                            {data[1].athleteName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CInputGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {filteredAthletes.map((data) =>
                Object.entries(data[1].events).map(([eventName, eventDetails]) => (
                    <ScorecardDisplay
                        key={data[1].athleteName + eventName}
                        athleteInfo={data[1]}
                        eventInfo={eventDetails}
                    />
                ))
            )}
            {/* {Object.entries(athleteData).map(([gender, categories]) =>
                Object.entries(categories).map(([category, athletes]) =>
                    Object.entries(athletes).map(([athleteName, athlete]) =>
                        athlete.events.map((event) => {
                            if (filters.genderFilter.length > 0 && filters.genderFilter !== gender) {
                                return (<div key={athlete.competitor.name + event.event} />)
                            }

                            if (filters.categoryFilter.length > 0 && filters.categoryFilter !== category) {
                                return (<div key={athlete.competitor.name + event.event} />)
                            }

                            if (filters.athleteFilter.length > 0 && filters.athleteFilter !== athleteName) {
                                return (<div key={athlete.competitor.name + event.event} />)
                            }

                            if (filters.eventFilter.length > 0 && !event.event.includes(filters.eventFilter)) {
                                return (<div key={athlete.competitor.name + event.event} />)
                            }

                            return (
                                <ScorecardDisplay
                                    key={athlete.competitor.name + event.event}
                                    athleteInfo={athlete}
                                    eventInfo={event}
                                />
                            );
                        })
                    )
                )
            )} */}
        </>
    )
}

export default Scorecard
