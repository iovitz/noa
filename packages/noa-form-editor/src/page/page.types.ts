import { Widget } from '@/widgets'

export interface FormSnapshot {
  id: string
  name: string
  shareUrl: string
  widgets: Widget[]
}
