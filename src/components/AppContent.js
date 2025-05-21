import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

import AuthRoute from '../authentication/AuthRoute'

import { Adults2025Provider } from '../views/2025team-trials/context/Adults2025Context'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            if (!route.element) return null

            const Element = route.element
            const wrapped = route.protected ? (
              <AuthRoute><Element /></AuthRoute>
            ) : (
              <Element />
            )

            const elementWithContext = route.path?.includes('2025-adults') ? (
              <Adults2025Provider>{wrapped}</Adults2025Provider>
            ) : (
              wrapped
            )

            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={elementWithContext}
              />
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
