import { WidgetTypes } from './widget.const'

export interface WidgetData<AttributesType extends WidgetCommonAttributes> {
  id: string
  attributes: AttributesType
}

export interface WidgetCommonAttributes {
  type: WidgetTypes
  name?: string
  description?: string
  rank: number
  hidden: boolean
  deleted: boolean
}

export interface TextAttributes extends WidgetCommonAttributes {
  text?: string // 段落内容
  lineHeight?: number // 行高
  textColor?: string // 文本颜色
}

export interface TitleAttributes extends WidgetCommonAttributes {
  title?: string // 标题内容
  titleLevel?: number // 标题等级（1~5）
  textColor?: string // 文本颜色
}
export interface NotificationAttributes extends WidgetCommonAttributes {
  text?: string // 段落内容
  noticeType?: string // 提醒类型
  title?: string // 提示标题
}

export interface ImageAttributes extends WidgetCommonAttributes {
  imageUrl?: string
  banner?: boolean // 是否全宽
  subtitle?: string // 图片标题(20个字以内)
}
export interface VideoAttributes extends WidgetCommonAttributes {
  videoUrl?: string
  subtitle?: string // 图片标题(20个字以内)
}
export interface LineAttributes extends WidgetCommonAttributes {
  videoUrl?: string
  subtitle?: string // 图片标题(20个字以内)
}

export interface ChartAttributes extends WidgetCommonAttributes {
  videoUrl?: string
  subtitle?: string // 图片标题(20个字以内)
}

export interface SingleSelectAttributes extends WidgetCommonAttributes {
  options?: {
    label: string
    value: string
  }[]
}

export interface MultiSelectAttributes extends WidgetCommonAttributes {
  options?: {
    label: string
    value: string
  }[]
}
