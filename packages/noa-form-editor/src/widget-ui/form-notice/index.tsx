import { Alert, AlertProps } from 'antd'
import React from 'react'

interface FormNoticeProps {
  title?: string
  text: string
  type?: AlertProps['type']
}
export default function FormNotice(props: FormNoticeProps) {
  return (
    <Alert
      message={props.title}
      description={props.text}
      type={props.type ?? 'info'}
    />
  )
}
