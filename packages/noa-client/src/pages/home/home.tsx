import PageHeader from '@/components/header/header'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'

export default function Home() {
  return (
    <Layout className="h-full">
      <PageHeader />
      <Layout>
        <Content>main content</Content>
      </Layout>
    </Layout>
  )
}
