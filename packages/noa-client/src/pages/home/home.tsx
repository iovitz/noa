import PageHeader from '@/components/header/header'
import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader />
      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  )
}
