import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './pages/routes'
import { http } from './shared/io/io'
import './style/initial.scss'
import './style/utils.scss'

http.initial({
  timeout: 60000,
  baseURL: '/api-noa',
})

createRoot(document.getElementById('NOA_APP')!).render(
  <BrowserRouter basename="noa">
    <AppRoutes />
  </BrowserRouter>,
)
