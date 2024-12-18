import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/error-boundary'
import AppRoutes from './pages/routes'
import { rootStore, RootStoreContext } from './store'
import './style/initial.scss'
import './style/utils.scss'

createRoot(document.getElementById('NOA_APP')!).render(
  <React.StrictMode>
    <BrowserRouter basename="noa">
      <ErrorBoundary>
        <RootStoreContext.Provider value={rootStore}>
          <AppRoutes />
        </RootStoreContext.Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
