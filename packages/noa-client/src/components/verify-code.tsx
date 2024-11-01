import { http } from '@/shared/io/io'
import React, { useEffect, useRef } from 'react'

interface Props {
  type: string
}

export default function VerifyCode(props: Props) {
  const svgContainer = useRef<HTMLDivElement>(null)
  const refreshCode = async () => {
    const { current } = svgContainer
    if (!current) {
      return
    }
    const width = current.offsetWidth
    const height = current.offsetHeight
    const { data } = await http.request({
      method: 'get',
      url: '/security/verify-code',
      params: {
        height,
        width,
        type: props.type,
      },
    })
    if (svgContainer.current) {
      svgContainer.current.innerHTML = data
    }
  }

  useEffect(() => {
    refreshCode()
    return () => {
      // ...
    }
  }, [])

  return (
    <div
      ref={svgContainer}
      onClick={refreshCode}
      className="w-full h-full flex-1 text-xs"
      style={{
        minHeight: '50px',
      }}
    />
  )
}
