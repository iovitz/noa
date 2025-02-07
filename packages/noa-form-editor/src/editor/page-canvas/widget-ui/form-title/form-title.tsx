import { Image, Typography } from 'antd'
import React, { PropsWithChildren } from 'react'

const { Title } = Typography

export default function FormTitle(props: PropsWithChildren) {
  return (
    <Title level={2}>{props.children}</Title>
  )
}
