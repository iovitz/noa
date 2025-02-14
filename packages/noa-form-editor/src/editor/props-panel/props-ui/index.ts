import { WidgetTypes } from '@/widgets'
import { TextPropertyUI } from './text/text-property-ui'

export const PropsUIMap: Record<string, typeof TextPropertyUI> = {
  text: TextPropertyUI,
}
