import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <>
      <br></br>
      <CFooter className="px-4">
        <div>
          <span className="ms-1"></span>
        </div>
        <div className="ms-auto">
          <span className="me-1">Created by Khai Nguyen</span>
        </div>
      </CFooter>
    </>
  )
}

export default React.memo(AppFooter)
