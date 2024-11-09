import { Avatar, Dropdown, Flex, MenuProps } from 'antd'
import React from 'react'

export default function HeaderAvatar() {
  const items: MenuProps['items'] = [
    {
      label: '个人信息',
      key: 'info',
    },
    {
      type: 'divider',
    },
    {
      label: '登出',
      key: 'logout',
    },
  ]

  return (
    <Flex justify="flex-end" align="center">
      <Dropdown menu={{ items }} trigger={['click']}>
        <Avatar className="cursor-pointer" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      </Dropdown>
    </Flex>
  )
}
