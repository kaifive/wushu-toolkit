import React, { useState, useRef, useEffect } from 'react'
import {
    CRow,
    CButton,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CAlert
} from '@coreui/react'

import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const [nameField, setNameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [subjectField, setSubjectField] = useState("");
    const [messageField, setMessageField] = useState("");

    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visibleFailure, setVisibleFailure] = useState(false);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

        emailjs
            .sendForm(serviceId, 'template_fgrygiq', form.current, {
                publicKey: 'xo572Xf-hdKwWQOr6',
            })
            .then(
                () => {
                    setVisibleSuccess(true);

                    setNameField("");
                    setEmailField("");
                    setSubjectField("");
                    setMessageField("");
                },
                (error) => {
                    setVisibleFailure(true);
                },
            );
    };


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setIsMobile]);

    return (
        <>
            <CAlert color="success" dismissible visible={visibleSuccess} onClose={() => setVisibleSuccess(false)}>
                Email sent successfully!
            </CAlert>
            <CAlert color="failure" dismissible visible={visibleFailure} onClose={() => setVisibleFailure(false)}>
                An error has occurred. Contact us directly via email at: tuongkhai.nguyen@gmail.com
            </CAlert>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Contact Us</strong>
                        </CCardHeader>
                        <CCardBody>
                            <form ref={form} onSubmit={sendEmail}>
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
                                        <CInputGroupText style={{ width: "100px" }}>Subject: </CInputGroupText>
                                        <CFormInput
                                            name="subject"

                                            value={subjectField}
                                            placeholder='Enter Subject'
                                            onChange={(event) => setSubjectField(event.target.value)}>
                                        </CFormInput>
                                    </CInputGroup>
                                </CRow>
                                <CRow>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText style={{ width: "100px" }}>Message: </CInputGroupText>
                                        <CFormInput
                                            name="message"
                                            value={messageField}
                                            placeholder='Enter Message'
                                            onChange={(event) => setMessageField(event.target.value)}>
                                        </CFormInput>
                                    </CInputGroup>
                                </CRow>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    {isMobile ? (
                                        <>
                                            <CButton
                                                type="submit"
                                                color="primary"
                                            >
                                                Send
                                            </CButton>
                                            <CButton
                                                color="secondary"
                                                onClick={() => {
                                                    setNameField("");
                                                    setEmailField("");
                                                    setSubjectField("");
                                                    setMessageField("");
                                                }}
                                            >
                                                Cancel
                                            </CButton>
                                        </>
                                    ) : (
                                        <>
                                            <CButton
                                                color="secondary"
                                                onClick={() => {
                                                    setNameField("");
                                                    setEmailField("");
                                                    setSubjectField("");
                                                    setMessageField("");
                                                }}
                                            >
                                                Cancel
                                            </CButton>
                                            <CButton
                                                type="submit"
                                                color="primary"
                                            >
                                                Send
                                            </CButton>
                                        </>
                                    )}

                                </div>
                            </form>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default ContactUs
