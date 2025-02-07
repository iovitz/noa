import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  name: '123'
}

export default function WidgetOperator(props: Props) {
  return (
    <div>
      {props.children}
    </div>
  )
}
