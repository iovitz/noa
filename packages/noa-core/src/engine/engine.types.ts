import { PageIO } from '../io'

export interface EngineParams {
  pageId: string
  io: PageIO
}

export enum ChangesetType {
  NewChanges = 'NewChanges',
}

export interface ChangeSetEvent {
  type: ChangesetType
  data: unknown
}
