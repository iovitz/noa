import { Input, Typography } from 'antd'
import React from 'react'

interface FormInputProps {
  question: string
  placeholder?: string
  rows?: number
}

export function NoaFormInput(props: FormInputProps) {
  const {
    question,
    placeholder = 'Please input...',
    rows = 4,

  } = props
  return (
    <div>
      <Typography.Paragraph>{question}</Typography.Paragraph>
      <Input.TextArea
        defaultValue=""
        placeholder={placeholder}
        rows={rows ?? 4}
        style={{
          resize: 'none',
        }}
      />
    </div>
  )
}
