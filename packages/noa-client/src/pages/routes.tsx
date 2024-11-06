import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from './home/home'
import Login from './login/login'
import NotFound from './notfound/notfound'

export default function AppRoutes() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
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
