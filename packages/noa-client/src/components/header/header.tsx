import { PlusOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CenterContainer } from '../style/style'
import HeaderAvatar from './header-avatar'

export default function PageHeader() {
  const navigate = useNavigate()
  const headerLabels: ItemType<MenuItemType>[] = [
    {
      key: '/',
      label: '文件中心',
    },
  ]

  return (
    <CenterContainer>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button type="link">Noa</Button>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={headerLabels}
          style={{ flex: 1, border: 'none', lineHeight: '50px' }}
          onClick={({ key }) => {
            navigate(key)
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button icon={<PlusOutlined />} className="mr-2" color="primary" variant="text" />
          <HeaderAvatar />
        </div>
      </div>
    </CenterContainer>
  )
}
