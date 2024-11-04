import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from './login/login'
import NotFound from './notfound/notfound'

export default function AppRoutes() {
  const elements = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])
  return elements
}
