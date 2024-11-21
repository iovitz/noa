import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/error-boundary'
import { logger } from './hooks/logger.hook'
import AppRoutes from './pages/routes'
import { rootStore, RootStoreContext } from './store'
import './style/initial.scss'
import './style/utils.scss'

logger.info('APP Running!')

createRoot(document.getElementById('NOA_APP')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RootStoreContext.Provider value={rootStore}>
        <BrowserRouter basename="noa">
          <AppRoutes />
        </BrowserRouter>
      </RootStoreContext.Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
