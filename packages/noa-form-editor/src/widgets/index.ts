import { ulid } from 'ulid'
import { WidgetTypes } from './widget.const'
import { ImageProperty, LineProperty, MultiSelectProperty, NoticeProperty, SingleSelectProperty, TextProperty, TitleProperty, WidgetProps } from './widget.types'

export * from './widget.const'
export * from './widget.types'

export interface WidgetPropertyTypeMap {
  // 内容组件
  [WidgetTypes.Text]: TextProperty
  [WidgetTypes.Title]: TitleProperty
  [WidgetTypes.Notice]: NoticeProperty
  [WidgetTypes.Image]: ImageProperty
  [WidgetTypes.Video]: TextProperty
  [WidgetTypes.Line]: LineProperty

  // 表单组件
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
