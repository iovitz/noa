import { TextAttributeUI } from './text-attribute-ui/text-attribute-ui'
import { TitleAttributesUI } from './title-attribute-ui/title-attribute-ui'
import { TitleLevelAttributeUI } from './title-level-attribute-ui'

export const AttributesUIMap: Record<string, typeof TextAttributeUI> = {
  text: TextAttributeUI,
  title: TitleAttributesUI,
  titleLevel: TitleLevelAttributeUI,
}
