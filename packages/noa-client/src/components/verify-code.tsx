import { ioClient } from '@/shared/io/io'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  type: string
}

export default function VerifyCode(props: Props) {
  const svgContainer = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  let firstLoad = false
  const refreshCode = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    const { current } = svgContainer
    if (!current) {
      return
    }
    const width = current.offsetWidth
    const height = current.offsetHeight
    const data = await ioClient.request({
      method: 'get',
      url: '/security/verify-code',
      params: {
        height,
        width,
        type: props.type,
        length: 4,
      },
    })

    setTimeout(() => {
      setIsLoading(false)
      if (svgContainer.current) {
        svgContainer.current.innerHTML = data
      }
    }, firstLoad ? 0 : 300)
    firstLoad = true
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
        width: '100%',
        height: '100%',
        display: 'flex',
        fontSize: 0,
        opacity: isLoading ? '.3' : '1',
      }}
    />
  )
}
