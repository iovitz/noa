import { Typography } from 'antd'
import React, { PropsWithChildren, useState } from 'react'

const { Paragraph } = Typography

export default function WrapperWidget(props: PropsWithChildren) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  return (
    <div style={{
      padding: '15px',
    }}
    >
      <Typography.Title
        level={4}
        editable={{
          onChange: setTitle,
        }}
      >
        {title}
      </Typography.Title>
      <Paragraph
        editable={{
          onChange: setDesc,
        }}
      >
        {desc}
      </Paragraph>
      {props.children}
    </div>
  )
}
