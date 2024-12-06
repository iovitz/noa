export enum EventName {
  ComponentChange = 'ComponentChange',
  PageLoaded = 'PageLoaded',
}

export interface EventContext {
  [EventName.ComponentChange]: {
    compId: string
  }
  [EventName.PageLoaded]: void
}
