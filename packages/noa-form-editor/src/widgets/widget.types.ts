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
  text?: string // 段落内容
  lineHeight?: number // 行高
  textColor?: string // 文本颜色
}

export interface TitleProperty extends WidgetCommonProps {
  title?: string // 标题内容
  titleLevel?: number // 标题等级（1~5）
  textColor?: string // 文本颜色
}
export interface NoticeProperty extends WidgetCommonProps {
  text?: string // 段落内容
  noticeType?: string // 提醒类型
}

export interface ImageProperty extends WidgetCommonProps {
  imageUrl?: string
  banner?: boolean // 是否全宽
  subtitle?: string // 图片标题(20个字以内)
}
export interface VideoProperty extends WidgetCommonProps {
  videoUrl?: string
  subtitle?: string // 图片标题(20个字以内)
}
export interface LineProperty extends WidgetCommonProps {
  videoUrl?: string
  subtitle?: string // 图片标题(20个字以内)
}

export interface ChartProperty extends WidgetCommonProps {
  videoUrl?: string
  subtitle?: string // 图片标题(20个字以内)
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
