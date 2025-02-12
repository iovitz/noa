import { WidgetTypes } from './widget.const'

export interface WidgetProps<PropertyType extends WidgetCommonProps> {
  id: string
  property: PropertyType
}

export interface WidgetCommonProps {
  type: WidgetTypes
  name?: string
  description?: string
  rank: number
  hidden: boolean
}

export interface TextProperty extends WidgetCommonProps {
  text?: string
  maxLength?: number
  minLength?: number
  question?: string
  placeholder?: string
}

export interface SingleSelectProperty extends WidgetCommonProps {
  options?: {
    label: string
    value: string
  }[]
}

export interface MultiSelectProperty extends WidgetCommonProps {
  options?: {
    label: string
    value: string
  }[]
}
