import React from 'react'
import { PropsUIMap } from './props-ui'

const PropertyUIWrapper = (props: { field: string }) => {
  const PropertyUI = PropsUIMap[props.field as keyof typeof PropsUIMap]
  if (!PropertyUI) {
    return null
  }
  return (
    <PropertyUI />
  )
}

export default PropertyUIWrapper
