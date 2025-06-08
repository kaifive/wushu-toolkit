import React, { useState, useRef } from 'react'
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
    CAlert,
    CInputGroup,
    CInputGroupText,
    CFormInput,
} from '@coreui/react'

import emailjs from '@emailjs/browser';

const About2025 = () => {
    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visibleFailure, setVisibleFailure] = useState(false);

    return (
        <>
            <CAlert color="success" dismissible visible={visibleSuccess} onClose={() => setVisibleSuccess(false)}>
                Order submitted successfully!
            </CAlert>
            <CAlert color="failure" dismissible visible={visibleFailure} onClose={() => setVisibleFailure(false)}>
                An error has occurred. Contact us directly via email at: tuongkhai.nguyen@gmail.com
            </CAlert>
            <CAlert color="info">The 2025 Adult Wushu Team Trials Continuous Monitoring Dashboard is currently <strong>live</strong>. Good luck to all competing athletes!</CAlert>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>2025 Adult Wushu Team Trials Continuous Monitoring Dashboard</strong>
                        </CCardHeader>
                        <CCardBody>
                            <div>
                                The Continuous Monitoring Dashboard is a dynamic dashboard designed to provide real-time insights for the 2025 US Adult Wushu Team Trials. Operating at a interval of 1 minute, it continuously retrieves scores from the competition, ensuring that the latest data is always readily available. Leveraging this data, the dashboard generates live metrics and visuals, configurable with easy-to-use dropdown filters, offering comprehensive insights for both parents and coaches before, during, and after the competition.
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
                            <div>✔ Access to Preliminary Schedule</div>
                            <br></br>
                            <strong>During Competition:</strong>
                            <div>✔ Live Standings for Girls</div>
                            <div>✔ Live Standings for Boys</div>
                            <div>✔ Athlete Event Scorecards</div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Pricing Model</strong>
                        </CCardHeader>
                        <CCardBody>
                            <div>
                                <strong>Before Friday, June 27, 2025 @ 9:00 AM</strong> | $50 per user
                            </div>
                            <div>
                                <strong>After Friday, June 27, 2025 @ 9:00 AM</strong> | $75 per user
                            </div>

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <OrderForm2025
                setVisibleSuccess={setVisibleSuccess}
                setVisibleFailure={setVisibleFailure}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <p style={{ fontSize: "12px" }}>The Continuous Monitoring Dashboard is not affiliated with the 2025 US Adult Wushu Team Trials organizers, and it is not an official product. While it is designed to be 99.9% accurate, all information provided should be independently verified against the organizers' data. The information presented and forecasted on this dashboard may vary in accuracy, yet it is strongly anticipated to be reliable. Upon completing the order form, users will be granted access to the dashboard within 12 hours of their payment. In the event of catastrophic failure*, all purchases will be reimbursed.</p>
            <p style={{ fontSize: "12px" }}><i>*Catastrophic failure is defined as the dashboard inaccurately collecting data to a statistically significant degree, which would be a result of an issue with the competition scoring system.</i></p>
        </>
    )
}

const OrderForm2025 = ({
    setVisibleSuccess,
    setVisibleFailure,
}) => {
    const [visible, setVisible] = useState(false)

    const [nameField, setNameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [schoolField, setSchoolField] = useState("");

    const form = useRef();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(serviceId, 'template_fmvwgaz', form.current, {
                publicKey: 'xo572Xf-hdKwWQOr6',
            })
            .then(
                () => {
                    setVisibleSuccess(true);

                    setNameField("");
                    setEmailField("");
                    setSchoolField("");

                    setVisible(false)
                },
                (error) => {
                    setVisibleFailure(true);
                },
            );
    };

    return (
        <>
            <CButton color="primary" onClick={() => setVisible(!visible)}>Order Form</CButton>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <form ref={form} onSubmit={sendEmail}>
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>Order Form</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CRow>
                            <CInputGroup className="mb-3">
                                <CInputGroupText style={{ width: "100px" }}>Name: </CInputGroupText>
                                <CFormInput
                                    name="contact_name"
                                    value={nameField}
                                    placeholder='Enter Contact Name'
                                    onChange={(event) => setNameField(event.target.value)}>
                                </CFormInput>
                            </CInputGroup>
                        </CRow>
                        <CRow>
                            <CInputGroup className="mb-3">
                                <CInputGroupText style={{ width: "100px" }}>Email: </CInputGroupText>
                                <CFormInput
                                    name="contact_email"
                                    value={emailField}
                                    placeholder='Enter Contact Email'
                                    onChange={(event) => setEmailField(event.target.value)}>
                                </CFormInput>
                            </CInputGroup>
                        </CRow>
                        <CRow>
                            <CInputGroup className="mb-3">
                                <CInputGroupText style={{ width: "100px" }}>School: </CInputGroupText>
                                <CFormInput
                                    name="school_name"
                                    value={schoolField}
                                    placeholder='Enter School Name'
                                    onChange={(event) => setSchoolField(event.target.value)}>
                                </CFormInput>
                            </CInputGroup>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => {
                            setNameField("");
                            setEmailField("");
                            setSchoolField("");

                            setVisible(false)
                        }}>
                            Cancel
                        </CButton>
                        <CButton type="submit" color="primary">Submit</CButton>
                    </CModalFooter>
                </form>
            </CModal>
        </>
    )
}

export default About2025
