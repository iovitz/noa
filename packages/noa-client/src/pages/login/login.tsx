import { Button, Card, Checkbox, Col, Divider, Form, Input, Row, Space } from 'antd'
import React from 'react'
import Regsiter from './register'

export default function Login() {
  return (
    <div className="h-full w-full bg-dark-900 flex items-center justify-center">
      <Card
        style={{ width: 400 }}
        title="登录Noa"
      >

        <Regsiter />

        <Divider plain>或者</Divider>

        <Space direction="vertical" className="w-full">
          <Button color="primary" block>返回登录</Button>
          <Button type="primary" color="primary" block>微信登录</Button>
        </Space>
      </Card>
    </div>

  )
}
