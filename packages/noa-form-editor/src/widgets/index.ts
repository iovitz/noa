import { ulid } from 'ulid'
import { WidgetTypes } from './widget.const'
import { ImageAttributes, LineAttributes, MultiSelectAttributes, NoticeAttributes, SingleSelectAttributes, TextAttributes, TitleAttributes, WidgetData } from './widget.types'

export * from './widget.const'
export * from './widget.types'

export interface WidgetAttributesTypeMap {
  // 内容组件
  [WidgetTypes.Text]: TextAttributes
  [WidgetTypes.Title]: TitleAttributes
  [WidgetTypes.Notice]: NoticeAttributes
  [WidgetTypes.Image]: ImageAttributes
  [WidgetTypes.Video]: TextAttributes
  [WidgetTypes.Line]: LineAttributes

  // 表单组件
  [WidgetTypes.SingleSelect]: SingleSelectAttributes
  [WidgetTypes.MultiSelect]: MultiSelectAttributes
}

export type WidgetAttributes = WidgetAttributesTypeMap[keyof WidgetAttributesTypeMap]
export type Widget = WidgetData<WidgetAttributes>

export class WidgetFactory {
  static createWidget<T extends keyof WidgetAttributesTypeMap>(attributes: WidgetAttributesTypeMap[T]): WidgetData<WidgetAttributesTypeMap[T]> {
    return {
      id: ulid(),
      attributes,
    }
  }
}
