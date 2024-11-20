import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './pages/routes'
import { ioClient } from './shared/io/io'
import { rootStore, RootStoreContext } from './store'
import './style/initial.scss'
import './style/utils.scss'

ioClient.initial({
  timeout: 60000,
  baseURL: '/api-noa',
})

createRoot(document.getElementById('NOA_APP')!).render(
  <React.StrictMode>
    <RootStoreContext.Provider value={rootStore}>
      <BrowserRouter basename="noa">
        <AppRoutes />
      </BrowserRouter>
    </RootStoreContext.Provider>
  </React.StrictMode>,
)
