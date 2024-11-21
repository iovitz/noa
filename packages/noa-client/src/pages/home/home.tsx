import PageHeader from '@/components/header/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PageHeader />
      <div
        style={{
          flex: 1,
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
