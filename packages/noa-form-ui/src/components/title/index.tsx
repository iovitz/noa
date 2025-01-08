import { Typography } from 'antd'
import React from 'react'

const { Title, Paragraph } = Typography

interface FormTitleProps {
  title: string
  subTitle?: string
}

export function FormTitle(props: FormTitleProps) {
  const { title, subTitle } = props

  return (
    <>
      <Title level={3} style={{ textAlign: 'center', margin: 5 }}>{title}</Title>
      <Paragraph style={{ textAlign: 'center' }}>{subTitle}</Paragraph>
    </>
  )
}
