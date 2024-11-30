import { PageIO } from '../io'

export interface EngineContext {
  id: string
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
