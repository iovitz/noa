import { ComponentParams } from '../components'

export interface FormSnapshot {
  id: string
  name: string
  shareUrl: string
  components: ComponentParams[]
}
