import { useLogger } from '@/hooks/logger.hook'
import { ioClient } from '@/shared/io/io'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { get } from 'lodash'
import React, { JSX, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ErrorHandlerProp {
  children: JSX.Element
}

export function ErrorBoundary({ children }: ErrorHandlerProp) {
  const [hasError, setHasError] = useState(false)
  const logger = useLogger('error-boundary')
  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage()

  const requestErrorHandler = (err: AxiosError) => {
    const code = get(err, ['response', 'data', 'code'], get(err, 'code')) ?? 'UNKNOWN ERROR'
    const message = get(err, ['response', 'data', 'message'], get(err, ['message']))
    logger.error(code, message, err)
    if (err.status === 401) {
      navigate('/login')
      messageApi.error({
        content: '请重新登录',
        duration: 1,
      })
      return
    }
    messageApi.error({
      content: `请求失败[${code}]: ${message}`,
      duration: 1,
    })
  }

  useEffect(() => {
    if (hasError) {
      // 清理操作(如果有的话)
    }
  }, [hasError])

  useEffect(() => {
    ioClient.addErrorHandler(requestErrorHandler)
    return () => ioClient.removeErrorHandler(requestErrorHandler)
  }, [])

  if (hasError) {
    return <h1>Some errors have occurred!</h1>
  }

  try {
    return (
      <>
        {contextHolder}
        {children}
      </>
    )
  }
  catch (error) {
    logger.error('渲染白屏:', error)
    setHasError(true)
    return null
  }
}
