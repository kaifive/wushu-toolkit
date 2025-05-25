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

import { useAdults2025 } from '../context/Adults2025Context.jsx';

const ScorecardDisplay = () => {
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

    if (!filters.eventFilter || !filters.athleteFilter) {
        return (
            <CAlert color="danger">
                Select an Athlete and Event to view scorecard.
            </CAlert>
        )
    }

    let athleteInfo = null;
    let eventInfo = null;

    for (const gender in athleteData) {
      const categories = athleteData[gender];
    
      for (const category in categories) {
        const competitors = categories[category];
    
        for (const name in competitors) {
          if (name === filters.athleteFilter) {
            const registration = competitors[name];
            const events = registration.events || [];
    
            for (let i = 0; i < events.length; i++) {
              if (events[i].event.includes(filters.eventFilter)) {
                athleteInfo = registration;
                eventInfo = events[i];
                break;
              }
            }
    
            if (athleteInfo) break;
          }
        }
    
        if (athleteInfo) break;
      }
    
      if (athleteInfo) break;
    }

    if (!athleteInfo || !eventInfo) {
        return (
            <CAlert color="danger">
                An error occurred getting athlete and event scorecard.
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
                                        <JudgeGroupCard label="A SCORE" value={5} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <DeductionCodes codes={[]} />
                                    </CCol>
                                </CRow>

                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <JudgeGroupCard label="B SCORE" value={0} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <BJudgeScores scores={[0, 0, 0, 0, 0]} />
                                    </CCol>
                                </CRow>

                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <JudgeGroupCard label="C SCORE" value={0} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <NanduCards
                                            codeSequence={eventInfo?.nandu || []}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow className="justify-content-center align-items-center text-center">
                                    <CCol xs="12" md="2" style={{ minWidth: 130 }}>
                                        <AdditionalDeductions value={0} />
                                    </CCol>
                                    <CCol xs="12" md="10">
                                        <FinalScore value={5} />
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
                    return (
                        <CButton
                            key={idx}
                            variant="ghost"
                            className="d-flex flex-column align-items-center justify-content-center"
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.25rem',
                            }}
                            color="danger"
                        >
                            {code}
                        </CButton>
                    );
                })}
            </CCardBody>
        </CCard>

    );
};

const BJudgeScores = ({ scores }) => {
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
                                    fontSize: '1.25rem',
                                }}
                            >
                                <CCardText className="text-success mb-1">
                                    {score.toFixed(3)}
                                </CCardText>
                            </CCardBody>
                        </CCard>
                    );
                })}
            </CCardBody>
        </CCard>

    );
};

const NanduCards = ({ codeSequence }) => {
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
                                {parts.map((part, i) => (
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
                                                fontSize: '1.25rem',
                                                flexShrink: 0,
                                            }}
                                            color="secondary"
                                        >
                                            {counter++}
                                        </CButton>
                                    </CTooltip>
                                ))}
                            </CCardBody>
                        </CCard>
                    );
                })}
            </CCardBody>
        </CCard>

    );
};

const AdditionalDeductions = ({ value }) => {
    if (value == 0) {
        return (<></>);
    }
    return (
        <CCard className="text-center border-0 p-0">
            <CCardBody className="p-2">

                <div className="text-danger" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                    -{value.toFixed(3)}
                </div>
                <CCardText className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>
                    <div>ADDITIONAL</div>
                    <div>DEDUCTIONS</div>
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
