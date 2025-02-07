import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/error-boundary'
import AppRoutes from './pages/routes'
import '@ant-design/v5-patch-for-react-19'
import './style/initial.scss'
import './style/utils.scss'

createRoot(document.getElementById('NOA_APP')!).render(
  <React.StrictMode>
    <BrowserRouter basename="noa">
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
