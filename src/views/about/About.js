import React, { useState, useEffect } from 'react'
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CRow,
    CButton,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CWidgetStatsD
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
    cibFacebook
} from '@coreui/icons'

const About = () => {
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>The Wushu Toolkit</strong>
                        </CCardHeader>
                        <CCardBody>
                            <div>
                                The Wushu Toolkit is a comprehensive dashboard designed to empower coaches, parents, and athletes within the wushu community. This all-in-one platform offers a suite of tools tailored to enhance the wushu experience by offering an easy to use system for a variety of purposes. Offering accessibility across various devices, users can seamlessly engage with its features. While it is ideally experienced on a laptop or computer for optimal viewing and interaction, mobile devices are supported for ease of use. Users can quickly access the dashboard through any web browser on their mobile devices. For any strange interactions, refresh the page/browser.
                            </div>
                            <br></br>
                            <div>
                                The Wushu Toolkit is accepting feature requests. If you have a tool you would like to see added to the toolkit, feel free to <strong><a href='#/contact-us'>Contact Us</a></strong>.
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Athlete Toolkit</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow xs={{ gutter: 3 }}>
                                <CCol xs={12} sm={12} xl={6} xxl={6}>
                                    <CWidgetStatsD
                                        className="mb-3"
                                        icon={
                                            <CButton
                                                color="primary"
                                                href='#/toolkit/deduction-code-lookup'
                                            >
                                                <strong>Deduction Code Lookup</strong>
                                            </CButton>
                                        }
                                        style={{ '--cui-card-cap-bg': '#5856d6' }}
                                        values={[
                                            { title: 'classes', value: '5' },
                                            { title: 'codes', value: '215' },
                                        ]}
                                    />
                                </CCol>
                                <CCol xs={12} sm={12} xl={6} xxl={6}>
                                    <CWidgetStatsD
                                        className="mb-3"
                                        icon={
                                            <CButton
                                                color="primary"
                                                href='#/toolkit/required-movements'
                                            >
                                                <strong>Required Movements Checklist</strong>
                                            </CButton>
                                        }
                                        style={{ '--cui-card-cap-bg': '#5856d6' }}
                                        values={[
                                            { title: 'classes', value: '5' },
                                            { title: 'types', value: '14' },
                                            { title: 'requirements', value: '188' },
                                        ]}
                                    />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>2024 National Wushu Taolu Team Trials</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow xs={{ gutter: 3 }}>
                                <CCol xs={12} sm={12} xl={6} xxl={6}>
                                    <CWidgetStatsD
                                        className="mb-3"
                                        icon={
                                            <CButton
                                                color="primary"
                                                href='#/2024-juniors/about'
                                            >
                                                <strong>Continuous Monitoring Dashboard</strong>
                                            </CButton>
                                        }
                                        style={{ '--cui-card-cap-bg': '#5856d6' }}
                                        values={[
                                            { title: 'minute refresh rate', value: '1' },
                                            { title: 'dashboard views', value: '8' },
                                        ]}
                                    />
                                </CCol>
                                <CCol xs={12} sm={12} xl={6} xxl={6}>
                                    <CWidgetStatsD
                                        className="mb-3"
                                        icon={
                                            <CButton
                                                color="primary"
                                                href='#/2024-juniors/about'
                                            >
                                                <strong>Combined Visuals</strong>
                                            </CButton>
                                        }
                                        style={{ '--cui-card-cap-bg': '#5856d6' }}
                                        values={[
                                            { title: 'table', value: '15' },
                                            { title: 'charts', value: '18' },
                                            { title: 'single value metrics', value: '26' },
                                        ]}
                                    />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default About
