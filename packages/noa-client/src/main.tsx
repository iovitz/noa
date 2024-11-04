import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './pages/routes'
import { http } from './shared/io/io'
import './style/initial.scss'
import './style/utils.scss'
import 'tailwindcss/tailwind.css'

http.initial({
  timeout: 30000,
  baseURL: '/api',
})

createRoot(document.getElementById('NOA_APP')!).render(
  <HashRouter>
    <AppRoutes />
  </HashRouter>,
)
