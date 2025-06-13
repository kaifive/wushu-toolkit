import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

import AuthRoute from '../authentication/AuthRoute'

import { SportdataProvider } from '../views/sportdataComponents/context/SportdataContext'

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

            const providersData = {
              '2025-adults': {
                provider: SportdataProvider,
              },
              '2025-phoenix': {
                provider: SportdataProvider,
              },
            }

            let elementWithContext = wrapped;

            for (const [pathSegment, providerData] of Object.entries(providersData)) {
              if (route.path?.includes(pathSegment)) {
                const Provider = providerData.provider;

                elementWithContext = (
                  <Provider
                    competition={pathSegment}
                  >
                    {wrapped}
                  </Provider>
                );
                break;
              }
            }

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
