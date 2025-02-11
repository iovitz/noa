import { useUserStore } from '@/store/user.store'
import { Avatar, Dropdown, Flex, MenuProps } from 'antd'
import React from 'react'

export default function HeaderAvatar() {
  const userStore = useUserStore()
  const items: MenuProps['items'] = [
    {
      label: userStore.nickname,
      key: 'nickname',
    },
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
      onClick: () => {
        userStore.logOut()
      },
    },
  ]

  return (
    <Flex justify="flex-end" align="center">
      <Dropdown menu={{ items }} trigger={['click']}>
        <Avatar className="cursor-pointer" size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      </Dropdown>
    </Flex>
  )
}
