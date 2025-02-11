import { ulid } from 'ulid'
import { WidgetTypes } from './widget.const'
import { MultiSelectProperty, SingleSelectProperty, TextProperty, WidgetProps } from './widget.types'

export * from './widget.const'
export * from './widget.types'

export interface WidgetPropertyTypeMap {
  [WidgetTypes.Text]: TextProperty
  [WidgetTypes.SingleSelect]: SingleSelectProperty
  [WidgetTypes.MultiSelect]: MultiSelectProperty
}

export type WidgetProperty = WidgetPropertyTypeMap[keyof WidgetPropertyTypeMap]
export type Widget = WidgetProps<WidgetProperty>

export class WidgetFactory {
  static createWidget<T extends keyof WidgetPropertyTypeMap>(property: WidgetPropertyTypeMap[T]): WidgetProps<WidgetPropertyTypeMap[T]> {
    return {
      id: ulid(),
      property,
    }
  }
}
