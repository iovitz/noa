export enum EventName {
  WidgetUpdate = 'WidgetUpdate',
  PageLoaded = 'PageLoaded',
}

export interface EventContext {
  [EventName.WidgetUpdate]: {
    id: string
  }
  [EventName.PageLoaded]: void
}
