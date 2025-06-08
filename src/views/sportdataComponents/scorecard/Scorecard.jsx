import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
} from '@coreui/react'

import { useSportdata } from '../context/SportdataContext.jsx';

import SportdataFilters from '../components/filters/SportdataFilters.jsx';
import ScorecardDisplay from './ScorecardDisplay.jsx'

const Scorecard = () => {
    const sportdataContext = useSportdata();
    const { data, filters, setFilters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

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
                            <SportdataFilters
                                showGenderFilter={true}
                                showCategoryFilter={true}
                                showEventFilter={true}
                                showAthleteFilter={true}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {Object.entries(athleteData).map(([gender, categories]) =>
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
            )}


        </>
    )
}

export default Scorecard
