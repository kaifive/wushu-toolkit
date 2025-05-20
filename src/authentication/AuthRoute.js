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
    CAlert
} from '@coreui/react'

import { auth } from './authService'
import { onAuthStateChanged } from "firebase/auth";

const AuthRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
      });
  
      return () => unsubscribe(); 
    }, []);

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
