import React from 'react'
import { useRoutes } from 'react-router-dom'
import Form from './form/form'
import Home from './home/home'
import Layout from './layout'
import GithubLogin from './login/github-login'
import Login from './login/login'
import NotFound from './notfound/notfound'
import Template from './template/template'

export default function AppRoutes() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/template',
          element: <Template />,
        },
        {
          path: '/form-editor/:fileId',
          element: <Form />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/github-login',
      element: <GithubLogin />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])
  return elements
}
