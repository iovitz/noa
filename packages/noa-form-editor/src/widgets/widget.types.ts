import { WidgetTypes } from './widget.const'

export interface WidgetCommon<PropertyType = unknown> {
  id: string
  name: string
  description: string
  rank: number
  hidden: boolean
  type: WidgetTypes
  property: PropertyType
}

export interface TextProperty {
  maxLength: number
  minLength: 0
  question: string
  placeholder?: string
}

export interface SingleSelectProperty {
  options: {
    label: string
    value: string
  }[]
}

export interface MultiSelectProperty {
  options: {
    label: string
    value: string
  }[]
}
