import type { ErrorInfo } from 'react'
import { ioClient } from '@/shared/io/io'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'

interface ErrorHandlerProp {
  children: JSX.Element
}

export function ErrorBoundary({ children }: ErrorHandlerProp) {
  const [hasError, setHasError] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const networkErrorHandler = (err: AxiosError) => {
    const code = get(err, 'response.data.code')
    const message = get(err, 'response.data.message')
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
    ioClient.addErrorHandler(networkErrorHandler)
    return () => ioClient.removeErrorHandler(networkErrorHandler)
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
    console.error('渲染白屏:', error)
    setHasError(true)
    return null
  }
}
