import { useImageVerifyCode } from '@/hooks/image-verify-code.hook'
import { useUserStore } from '@/hooks/user.store.hook'
import { appLogger } from '@/shared/logger/logger'
import { useRequest } from 'ahooks'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

interface FormData {
  email: string
  password: string
  code: string
  agree: string
}

const LoginForm = observer(() => {
  const { register } = useUserStore()
  const { VerifyCode, refreshCode } = useImageVerifyCode('register')
  const { run, loading } = useRequest(
    ({ email, password, code }: FormData) => register(email, password, code),
    {
      manual: true,
      onSuccess(data, params) {
        appLogger.log(data, params)
      },
      onFinally: refreshCode,
    },
  )

  useEffect(() => {
    refreshCode()
  }, [])

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      variant="filled"
      labelAlign="left"
      onFinish={(data) => {
        console.error(data)
        run(data)
      }}
      initialValues={{ agree: true }}
    >
      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, type: 'email', min: 6, max: 20, message: '邮箱格式错误' }]}
      >
        <Input type="email" minLength={6} maxLength={20} />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, min: 6, max: 16, message: '密码格式错误' }]}
      >
        <Input.Password minLength={6} maxLength={16} />
      </Form.Item>

      <Form.Item
        label="验证码"
        name="code"
        rules={[{ required: true, type: 'string', len: 4, message: '验证码格式错误' }]}
      >
        <Row gutter={12}>
          <Col className="gutter-row" span={14}>
            <Input maxLength={4} />
          </Col>
          <Col className="gutter-row" span={10}>
            <VerifyCode />
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agree"
        valuePropName="checked"
        wrapperCol={{ offset: 7, span: 17 }}
        rules={[
          {
            validator: (_, value) => {
              return value
                ? Promise.resolve()
                : Promise.reject(new Error('请同意协议'))
            },
          },
        ]}
      >
        <Checkbox>同意《隐私策略》</Checkbox>
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>注册</Button>
    </Form>
  )
})

export default LoginForm
