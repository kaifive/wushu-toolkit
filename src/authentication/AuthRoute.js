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
    CAlert,
    CSpinner
} from '@coreui/react'

import { auth } from './authService'
import { onAuthStateChanged } from "firebase/auth";

const AuthRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // 🔹 Track loading

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <CSpinner color="primary" />
            </div>
        );
    }

    if (isLoggedIn) {
        return children;
    }

    return (
        <CModal
            visible={true}
            size='sm'
        >
            <CModalHeader
                closeButton={false}
            >
                <CModalTitle>Login Required. This page requires login!</CModalTitle>
            </CModalHeader>
            <CModalFooter>
                <CButton
                    color="secondary"
                    onClick={() => window.history.back()}
                >
                    Back
                </CButton>
                <CButton href='#/login' color="primary">
                    Login
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AuthRoute
