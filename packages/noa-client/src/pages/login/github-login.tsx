import { ioClient, ServerData } from '@/shared/io/io'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GithubLogin = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    const code = queryParams.get('code')

    ioClient.request<ServerData<any>>({
      url: '/user/github-login',
      method: 'post',
      data: {
        code,
      },
    }).then(console.error)
  }, [])
  return (
    <div>Github登录中...</div>
  )
}

export default GithubLogin
