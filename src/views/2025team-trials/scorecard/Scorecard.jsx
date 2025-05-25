import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
} from '@coreui/react'

import { useAdults2025 } from '../context/Adults2025Context.jsx';

import Adults2025Filters from '../components/filters/Adults2025Filters.jsx';
import ScorecardDisplay from './ScorecardDisplay.jsx'

const Scorecard25 = () => {
    const adults25Context = useAdults2025();
    const { data, filters, setFilters } = adults25Context

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
                            <Adults2025Filters
                                showGenderFilter={true}
                                showCategoryFilter={true}
                                showEventFilter={true}
                                showAthleteFilter={true}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <ScorecardDisplay />
        </>
    )
}

export default Scorecard25
