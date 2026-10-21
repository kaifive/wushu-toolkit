import React from 'react'
import {
    CCol,
    CRow,
    CAlert,
} from '@coreui/react'

const ComingSoon = () => {
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="warning">This feature is coming soon, please check back later.</CAlert>
                </CCol>
            </CRow>
        </>
    )
}

export default ComingSoon
