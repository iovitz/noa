import { PageIO } from '../io'
import { FormSnapshot } from '../page'

export interface PageModel {
  id: string
  fromJSON: (data: FormSnapshot) => void
}
export interface EngineParams {
  io: PageIO
}

export enum ChangesetType {
  NewChanges = 'NewChanges',
}

export interface ChangeSetEvent {
  type: ChangesetType
  data: unknown
}
