import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderAvatar from './header-avatar'

export default function PageHeader() {
  const navigate = useNavigate()
  const headerLabels: ItemType<MenuItemType>[] = [
    {
      key: '/',
      label: '首页',
    },
    {
      key: 'template',
      label: '模板',
    },
    {
      key: 'editor',
      label: '编辑器',
    },
  ]

  return (

    <div className="flex container mx-auto flex-row">
      <div className="h-full flex items-center">
        <Button type="link">Noa</Button>
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['/']}
        items={headerLabels}
        style={{ flex: 1, minWidth: 0, border: 'none', height: '50px' }}
        onClick={({ key }) => {
          navigate(key)
        }}
      />
      <div className="flex items-end items-center">
        <Button icon={<PlusOutlined />} className="mr-2" color="default" variant="text" />
        <HeaderAvatar />
      </div>
    </div>
  )
}
