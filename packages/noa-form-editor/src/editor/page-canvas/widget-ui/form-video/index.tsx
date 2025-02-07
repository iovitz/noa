import { Image } from 'antd'
import React from 'react'

interface FormVideoProps {
  poster: string
  src: string
}

export default function FormVideo(props: FormVideoProps) {
  return (
    <Image
      preview={{
        destroyOnClose: true,
        imageRender: () => (
          <video
            muted
            width="100%"
            controls
            src={props.src}
          />
        ),
        toolbarRender: () => null,
      }}
      src={props.poster}
    />
  )
}
