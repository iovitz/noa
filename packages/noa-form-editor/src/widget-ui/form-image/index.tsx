import { Image } from 'antd'
import React from 'react'

interface FormImageProps {
  src: string
}

export default function FormImage(props: FormImageProps) {
  return (
    <Image src={props.src} />
  )
}
