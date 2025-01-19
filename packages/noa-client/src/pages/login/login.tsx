import { Button, Card, Divider, Space } from 'antd'
import React, { useState } from 'react'
import LoginForm from './login-form'
import RegisterForm from './register-form'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  interface GithubOauthAuthorizeData {
    /**
     *
     * 提供用于登录和授权应用程序的特定账户【可空】。注意，经过试验后，这里要填的是 GitHub 用户名，这样跳转之后会向用户建议登录该账号。
     */
    login: string
    state: string
    redirect_uri: string
  }
  function githubOauthAuthorize(data: GithubOauthAuthorizeData) {
    const query = new URLSearchParams({
      ...data,
      client_id: 'Ov23liY7dzZmKSWkPWPi',
      scope: '',
      allow_signup: 'true',
    })
    const url = `https://github.com/login/oauth/authorize?${query.toString()}`
    window.location.href = url // 直接跳转
    // 或 window.open(url) // 或者另外开窗口
  }

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
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

        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Button color="default" variant="filled" block onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '前往注册' : '返回登录'}
          </Button>
          <Button
            color="default"
            variant="solid"
            block
            onClick={() => {
              githubOauthAuthorize({
                login: 'github',
                redirect_uri: 'http://localhost:21922/noa/login?auth=github',
                state: 'true',
              })
            }}
          >
            使用 Github 账号登录
          </Button>
        </Space>
      </Card>
    </div>

  )
}
