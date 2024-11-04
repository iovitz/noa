import { Button, Card, Divider, Space } from 'antd'
import React, { useState } from 'react'
import LoginForm from './login-form'
import RegisterForm from './register-form'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="h-full w-full bg-dark-900 flex items-center justify-center">
      <Card
        style={{ width: 400 }}
        title="登录Noa"
      >

        {
          isLogin
            ? <LoginForm />
            : <RegisterForm />
        }
        <Divider plain>或者</Divider>

        <Space direction="vertical" className="w-full">
          <Button color="default" variant="filled" block onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '前往注册' : '返回登录'}
          </Button>
          <Button color="default" variant="solid" block>
            使用 Github 账号登录
          </Button>
        </Space>
      </Card>
    </div>

  )
}
