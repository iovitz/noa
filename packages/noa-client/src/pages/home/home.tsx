import PageHeader from '@/components/header/header'
import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <Layout className="h-full">
      <PageHeader />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  )
}
