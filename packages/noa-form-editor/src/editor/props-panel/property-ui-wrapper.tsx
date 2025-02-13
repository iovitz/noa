import React from 'react'
import { PropsUIMap } from './props-ui'

const PropertyUIWrapper = (props: { field: string, widgetId: string }) => {
  const PropertyUI = PropsUIMap[props.field as keyof typeof PropsUIMap]
  if (!PropertyUI) {
    return null
  }
  return (
    <PropertyUI widgetId={props.widgetId} />
  )
}

export default PropertyUIWrapper
