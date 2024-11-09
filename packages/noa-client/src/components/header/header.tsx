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
    <Header>
      <Flex gap="middle">
        <Flex align="center">
          <Button type="link">Noa</Button>
        </Flex>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          items={headerLabels}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            navigate(key)
          }}
        />
        <Flex justify="flex-end" align="center">
          <Button type="primary" icon={<PlusOutlined />} />
        </Flex>
        <HeaderAvatar />
      </Flex>
    </Header>
  )
}
