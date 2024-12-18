export enum EventName {
  ComponentUpdate = 'ComponentUpdate',
  PageLoaded = 'PageLoaded',
}

export interface EventContext {
  [EventName.ComponentUpdate]: {
    compId: string
  }
  [EventName.PageLoaded]: void
}
