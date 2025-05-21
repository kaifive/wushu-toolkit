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
    CContainer,
    CWidgetStatsF,
} from '@coreui/react'

import { useAdults2025 } from '../context/Adults2025Context.jsx';

import CategoryFilterRow from '../components/filters/CategoryFilterRow.jsx';

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
                            <CategoryFilterRow />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setFilters((prev) => ({ ...prev, categoryFilter: "" }))
                                    }}>
                                    Reset Selection
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Aaron Yang Scorecard</strong> | Taolu Team Trials - Nanquan
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={3}>

                                    <CWidgetStatsF
color="primary"
padding={false}

title="Widget title"
value="89.9%"
        />
                                    </CCol>
                                    <CCol xs={9}>2 of 3 (wider)</CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={3}>1 of 3</CCol>
                                    <CCol xs={9}>2 of 3 (wider)</CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={3}>1 of 3</CCol>
                                    <CCol xs={9}>2 of 3 (wider)</CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={6}>1 of 3</CCol>
                                    <CCol xs={6}>2 of 3 (wider)</CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </>
    )
}

export default Scorecard25
