import { Input, Typography } from 'antd'
import React from 'react'

interface FormInputProps {
  question: string
  placeholder?: string
  rows?: number
}

export function NoaFormInput(props: FormInputProps) {
  return (
    <div>
      <Typography.Paragraph>{props.question}</Typography.Paragraph>
      <Input.TextArea
        defaultValue=""
        placeholder={props.placeholder ?? 'Please input...'}
        rows={props.rows ?? 4}
        style={{
          resize: 'none',
        }}
      />
    </div>
  )
}
