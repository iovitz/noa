import { WidgetTypes } from './widget.const'

export interface WidgetProps<PropertyType extends WidgetCommonProps> {
  id: string
  type: WidgetTypes
  property: PropertyType
}

export interface WidgetCommonProps {
  name?: string
  description?: string
  rank: number
  hidden: boolean
}

export interface TextProperty extends WidgetCommonProps {
  maxLength: number
  minLength: 0
  question: string
  placeholder?: string
}

export interface SingleSelectProperty extends WidgetCommonProps {
  options: {
    label: string
    value: string
  }[]
}

export interface MultiSelectProperty extends WidgetCommonProps {
  options: {
    label: string
    value: string
  }[]
}
