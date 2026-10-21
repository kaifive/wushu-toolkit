import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { auth, login } from "../../../authentication/authService";
import { sendPasswordResetEmail } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      //window.location.reload(); // Refresh to apply session check
      window.location.hash = "#/2025-juniors/male-standings";
    } catch (err) {
      setError("Invalid credentials");
    }
  }

  const handleForgotPassword = async (e) => {
    try {
      await sendPasswordResetEmail(auth, email);
      handleCloseForgotPasswordModal();
    } catch (error) {
      console.log(error)
      alert("Could not reset email. Contact tuongkhai.nguyen@gmail.com")
    }
  }

  const handleCloseForgotPasswordModal = () => {
    setForgotPasswordModalVisible(false);
    setEmail("");
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => {
                          setEmail(e.currentTarget.value)

                          if (error.length > 0) {
                            setError("")
                          }
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e.currentTarget.value)
                          if (error.length > 0) {
                            setError("")
                          }
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      {error && <p style={{ color: '#e55353' }}>{error}</p>}

                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={() => setForgotPasswordModalVisible(true)}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Login information will be provided within 12 hours upon completing the order form and sending total payment.
                    </p>
                    <Link to="/2025-order-form">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Order Form
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <CModal
        visible={forgotPasswordModalVisible}
        onClose={handleCloseForgotPasswordModal}
      >
        <CModalHeader onClose={handleCloseForgotPasswordModal}>
          <CModalTitle>Reset Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CInputGroup className="mb-3">
              <CInputGroupText style={{ width: "100px" }}>Email: </CInputGroupText>
              <CFormInput
                value={email}
                placeholder='Enter Email'
                onChange={(event) => setEmail(event.target.value)}>
              </CFormInput>
            </CInputGroup>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseForgotPasswordModal}>
            Cancel
          </CButton>
          <CButton onClick={handleForgotPassword} color="primary">Send Reset Link</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Login
