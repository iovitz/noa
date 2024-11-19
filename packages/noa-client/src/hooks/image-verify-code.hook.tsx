import { ioClient } from '@/shared/io/io'
import { appLogger } from '@/shared/logger/logger'
import { useRequest } from 'ahooks'
import { useEffect, useRef, useState } from 'react'

export function useImageVerifyCode(type: string) {
  const [captchaSrc, setCaptchaSrc] = useState<string>('')
  const svgContainer = useRef<HTMLDivElement>(null)
  const { run: refreshCode, loading } = useRequest(
    () => {
      const { current } = svgContainer
      if (!current) {
        return Promise.resolve('')
      }
      const width = current.offsetWidth
      const height = current.offsetHeight
      return ioClient.request({
        method: 'get',
        url: '/security/verify-code',
        params: {
          height,
          width,
          type,
          length: 4,
        },
      })
    },
    {
      manual: true,
      onSuccess(data) {
        setCaptchaSrc(data)
      },
    },
  )

  const VerifyCode = () => (
    <div
      ref={svgContainer}
      onClick={() => !loading && refreshCode()}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        fontSize: 0,
        opacity: loading ? '.3' : '1',
      }}
    >
      {
        captchaSrc
          ? (
              <img
                src={`data:image/svg+xml;base64,${btoa(captchaSrc)}`}
              />
            )
          : null
      }
    </div>
  )

  return {
    VerifyCode,
    refreshCode,
  }
}
