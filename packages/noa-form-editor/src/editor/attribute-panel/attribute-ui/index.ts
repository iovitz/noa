import { NotificationTypeAttribute } from './nitification-type-attribute'
import { TextAttribute } from './text-attribute'
import { TitleAttributes } from './title-attribute'
import { TitleLevelAttribute } from './title-level-attribute'
import { UrlAttribute } from './url-attribute/url-attribute-ui'

export const AttributesUIMap: Record<string, typeof TextAttribute> = {
  text: TextAttribute,
  title: TitleAttributes,
  titleLevel: TitleLevelAttribute,
  imageUrl: UrlAttribute,
  noticeType: NotificationTypeAttribute,
}
