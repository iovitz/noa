import React from 'react'
import { useRoutes } from 'react-router-dom'
import NotFound from './notfound/notfound'

export default function AppRoutes() {
  const elements = useRoutes([
    {
      path: '*',
      element: <NotFound />,
    },
  ])
  return elements
}
