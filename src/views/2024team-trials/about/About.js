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
    CCardBody
} from '@coreui/react'

import orderform from './orderform.png';

const About = () => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>2024 Junior Wushu Team Trials Continuous Monitoring Dashboard</strong>
                        </CCardHeader>
                        <CCardBody>
                            <div>
                                The Continuous Monitoring Dashboard is a dynamic dashboard designed to provide real-time insights for the 2024 US Junior Wushu Team Trials. Operating at a interval of 1 minute, it continuously retrieves scores from the competition, ensuring that the latest data is always readily available. Leveraging this data, the dashboard generates live metrics and visuals, configurable with easy-to-use dropdown filters, offering comprehensive insights for both parents and coaches before, during, and after the competition.
                            </div>
                            <br></br>
                            <div>
                                The Continuous Monitoring Dashboard offers accessibility across various devices, ensuring users can seamlessly engage with its features. While it is ideally experienced on a laptop or computer for optimal viewing and interaction, mobile devices are supported for ease of use. Users can quickly access the dashboard through any web browser on their mobile devices. For any strange interactions, refresh the page/browser.
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Feature Set</strong>
                        </CCardHeader>
                        <CCardBody>
                            <strong>Before Competition:</strong>
                            <div>✔ Access to Demo environment with sample data</div>
                            <div>✔ Access to Preliminary Schedule</div>
                            <br></br>
                            <strong>During Competition:</strong>
                            <div>✔ Live Table of All Scores</div>
                            <div>✔ Live Standings for Girls</div>
                            <div>✔ Live Standings for Boys</div>
                            <div>✔ Holistic KPIs Dashboard</div>
                            <div>✔ Individual Athlete Metrics Dashboard</div>
                            <div>✔ Event Analytics Dashboard</div>
                            <div>✔ US Team Breakdown Dashboard</div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CButton color="primary" onClick={() => setVisible(!visible)}>Order Form</CButton>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Order Form</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <img style={{width: "100%"}} src={orderform} alt="Order Form QR Code" />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton href='https://tinyurl.com/2024Trials' target="_blank" color="primary">Go To Order Form</CButton>
                </CModalFooter>
            </CModal>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <p style={{ fontSize: "12px" }}>The Continuous Monitoring Dashboard is not affiliated with the 2024 US Junior Wushu Team Trials organizers, and it is not an official product. While it is designed to be 99.9% accurate, all information provided should be independently verified against the organizers' data. The information presented and forecasted on this dashboard may vary in accuracy, yet it is strongly anticipated to be reliable. Upon completing the order form, users will be granted access to the dashboard within 12 hours of their payment. In the event of catastrophic failure*, all purchases will be reimbursed.</p>
            <p style={{ fontSize: "12px" }}><i>*Catastrophic failure is defined as the dashboard inaccurately collecting data to a statistically significant degree, which would be a result of an issue with the competition scoring system.</i></p>
        </>
    )
}

export default About
