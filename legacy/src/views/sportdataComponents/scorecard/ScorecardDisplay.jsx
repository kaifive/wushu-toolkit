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
    CCardText,
    CTooltip,
    CCardTitle,
} from '@coreui/react'

import { useSportdata } from '../context/SportdataContext.jsx';

const ScorecardDisplay = ({ athleteInfo, eventInfo }) => {
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
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>{athleteInfo.competitor.name} Scorecard</strong> | {eventInfo.event}
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <JudgeGroupCard label="A SCORE" value={parseFloat(eventInfo?.A?.score ?? 0)} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <DeductionCodes codes={eventInfo?.A?.deductions ?? []} />
                                    </CCol>
                                </CRow>

                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <JudgeGroupCard label="B SCORE" value={parseFloat(eventInfo?.B?.score ?? 0)} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <BJudgeScores scores={eventInfo?.B?.scores ?? []} booleans={eventInfo?.B?.isNotDropped ?? []} />
                                    </CCol>
                                </CRow>

                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <JudgeGroupCard label="C SCORE" value={parseFloat(eventInfo?.C?.score ?? 0)} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <NanduCards
                                            counts={eventInfo?.C?.counts || []}
                                            codeSequence={eventInfo?.nandu || []}
                                            booleans={eventInfo?.C?.isNotMissed || []}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <AdditionalDeductions value={eventInfo?.adjustment} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <FinalScore value={parseFloat(eventInfo?.finalScore ?? 0)} />
                                    </CCol>
                                </CRow>
                            </CContainer>

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

const JudgeGroupCard = ({ label, value }) => {
    return (
        <CCard className="text-center border-0 p-0">
            <CCardBody className="p-2">
                <div className="text-primary" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                    {value.toFixed(3)}
                </div>
                <CCardText className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>
                    {label}
                </CCardText>
            </CCardBody>
        </CCard>
    );
};

const DeductionCodes = ({ codes }) => {
    return (
        <CCard className="border-0 p-0">
            <CCardBody
                className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 p-2"
                style={{ alignItems: 'center' }}
            >
                {codes.map((code, idx) => {
                    if (code === "0.0") {
                        return <div key={idx}/>
                    }

                    return (
                        <CButton
                            key={idx}
                            variant="ghost"
                            className="d-flex flex-column align-items-center justify-content-center"
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.rem',
                            }}
                            color="danger"
                            href={`#/toolkit/deduction-code-lookup?code=${code}`}
                            target='_blank'
                        >
                            {code}
                        </CButton>
                    );
                })}
            </CCardBody>
        </CCard>

    );
};

const BJudgeScores = ({ scores, booleans }) => {
    return (
        <CCard className="border-0 p-0">
            <CCardBody
                className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 p-2"
                style={{ alignItems: 'center' }}
            >
                {scores.map((score, idx) => {
                    return (
                        <CCard key={idx} className="border-0 p-0">
                            <CCardBody
                                className="d-flex gap-2 bg-body-secondary rounded px-2 py-1"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.rem',
                                }}
                            >
                                <CCardText className={`text-${booleans[idx] ? "success" : "danger"} mb-1`}>
                                    {score}
                                </CCardText>
                            </CCardBody>
                        </CCard>
                    );
                })}
            </CCardBody>
        </CCard>

    );
};

const NanduCards = ({ counts, codeSequence, booleans }) => {
    let counter = 1;

    if (codeSequence.length === 0) {
        return (
            <CAlert color="danger">
                No Nandu Information Found. Athlete has not paid for registration yet.
            </CAlert>
        )
    }

    return (
        <CCard className="border-0 p-0">
            <CCardBody
                className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 p-2"
                style={{ alignItems: 'center' }}
            >
                {codeSequence.map((combo, idx) => {
                    const parts = combo.split('+');


                    return (
                        <CCard key={idx} className="border-0 p-0">
                            <CCardBody
                                className="d-flex gap-2 bg-body-secondary rounded px-2 py-1"
                                style={{ flexShrink: 0 }}
                            >
                                {parts.map((part, i) => {
                                    let color = "secondary";

                                    if (booleans[counter - 1] === true) {
                                        color = "success"
                                    } else if (booleans[counter - 1] === false) {
                                        color = "danger"
                                    }

                                    return (
                                        <CTooltip
                                            key={i}
                                            content={`${i > 0 ? '+' : ''}${part}`}
                                            placement="top"
                                        >
                                            <CButton
                                                key={i}
                                                className="d-flex flex-column align-items-center justify-content-center border-3 border-white"
                                                style={{
                                                    width: '55px',
                                                    height: '55px',
                                                    borderRadius: '50%',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.rem',
                                                    flexShrink: 0,
                                                }}
                                                color={color}
                                            >
                                                {counter++}
                                            </CButton>
                                        </CTooltip>
                                    )
                                }
                                )}
                            </CCardBody>
                        </CCard>
                    );
                })}
            </CCardBody>
        </CCard>

    );
};

const AdditionalDeductions = ({ value }) => {
    if (!value || value?.length === 0) {
        return (<></>);
    }
    return (
        <CCard className="text-center border-0 p-0">
            <CCardBody className="p-2">

                <div className={`text-${value.includes("-") ? "danger" : "success"}`} style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                    {value}
                </div>
                <CCardText className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>
                    ADJUSTMENTS
                </CCardText>
            </CCardBody>
        </CCard>
    )
}

const FinalScore = ({ value }) => {
    return (
        <CCard className="text-center border-0 p-0">
            <CCardBody className="p-2 d-flex flex-column flex-md-row align-items-center gap-3">
                <div
                    className="text-muted"
                    style={{
                        fontSize: '2.75rem',
                    }}
                >
                    <div>FINAL SCORE</div>
                </div>
                <div
                    className="text-primary"
                    style={{
                        fontSize: '2.75rem',
                        fontWeight: 'bold',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {value.toFixed(3)}
                </div>
            </CCardBody>
        </CCard>
    );
};


export default ScorecardDisplay
