import React from 'react'
import { AttributesUIMap } from './attribute-ui'

const AttributeUIWrapper = (props: { field: string, widgetId: string }) => {
  const AttributeUI = AttributesUIMap[props.field as keyof typeof AttributesUIMap]
  if (!AttributeUI) {
    return null
  }
  return (
    <AttributeUI widgetId={props.widgetId} />
  )
}

export default AttributeUIWrapper
