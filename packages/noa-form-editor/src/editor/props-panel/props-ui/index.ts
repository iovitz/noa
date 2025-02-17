import { TextPropertyUI } from './text-property/text-property-ui'
import { TitlePropertyUI } from './title-property/title-property-ui'

export const PropsUIMap: Record<string, typeof TextPropertyUI> = {
  text: TextPropertyUI,
  title: TitlePropertyUI,
}
