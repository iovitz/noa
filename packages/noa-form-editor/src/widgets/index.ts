import { ulid } from 'ulid'
import { WidgetTypes } from './widget.const'
import { MultiSelectProperty, SingleSelectProperty, TextProperty, WidgetCommon } from './widget.types'

export * from './widget.const'
export * from './widget.types'

export interface WidgetPropertyTypeMap {
  [WidgetTypes.Text]: TextProperty
  [WidgetTypes.SingleSelect]: SingleSelectProperty
  [WidgetTypes.MultiSelect]: MultiSelectProperty
}

export type WidgetPropertyUnionType = WidgetPropertyTypeMap[keyof WidgetPropertyTypeMap]
export type WidgetUnionType = WidgetCommon<WidgetPropertyUnionType>

export class WidgetFactory {
  static createWidget<T extends keyof WidgetPropertyTypeMap>(compType: T, property: WidgetPropertyTypeMap[T]): WidgetCommon<WidgetPropertyTypeMap[T]> {
    return {
      id: ulid(),
      name: '',
      description: '',
      rank: 0,
      hidden: false,
      type: compType,
      property,
    }
  }
}
