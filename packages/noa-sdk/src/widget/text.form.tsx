import { Form, Input } from 'antd'
import React from 'react'
import WrapperWidget from './wrapper.widget'

export default function TextFormWidget() {
  return (
    <WrapperWidget>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input.TextArea />
      </Form.Item>
    </WrapperWidget>
  )
}
