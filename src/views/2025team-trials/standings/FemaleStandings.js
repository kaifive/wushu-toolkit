import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CButton,
} from '@coreui/react'

import { useAdults2025 } from '../context/Adults2025Context.jsx';

import { CATEGORY_MAP } from "../lookups/categoryMap.js"

import CategoryFilterRow from '../components/filters/CategoryFilterRow.jsx';
import StandingsTable from '../components/StandingsTable.jsx';

const FemaleStandings = () => {
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

    const dataMap = {
        CQ_DS_GS: athleteData.FEMALES.CQ_DS_GS,
        CQ_JS_QS: athleteData.FEMALES.CQ_JS_QS,
        NQ_ND_NG: athleteData.FEMALES.NQ_ND_NG,
        TQ_TJ_TS: athleteData.FEMALES.TQ_TJ_TS,
    };


    const filteredCategories = filters.categoryFilter
        ? [filters.categoryFilter]
        : Object.keys(CATEGORY_MAP);

    const standingTables = (
        filteredCategories.map((key) => (
            <CRow key={key}>
                <CCol xs={12}>
                    <StandingsTable gender="Female" category={CATEGORY_MAP[key]} data={dataMap[key]} />
                </CCol>
            </CRow>
        ))
    );

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Standings as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Standing Filters</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CategoryFilterRow />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setFilters((prev) => ({...prev, categoryFilter: ""}))
                                    }}>
                                    Reset Filter
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {standingTables}
        </>
    )
}

export default FemaleStandings
