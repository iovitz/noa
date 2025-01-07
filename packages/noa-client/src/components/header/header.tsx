import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Space, theme, Typography } from 'antd'
import React from 'react'
import HeaderAvatar from './header-avatar'

const { Title } = Typography
const { useToken } = theme

export default function PageHeader() {
  const { token } = useToken()

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        background: token.colorFillQuaternary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
            paddingTop: 12,
            paddingBottom: 12,
            marginLeft: 10,
          }}
        >
          诺亚
        </Title>
      </div>
      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 10,
        }}
      >
        <Button icon={<SearchOutlined />} className="mr-2" size="large" color="primary" variant="text" />
        <Button icon={<PlusOutlined />} className="mr-2" size="large" color="primary" variant="text" />
        <HeaderAvatar />
      </Space>
    </div>
  )
}
