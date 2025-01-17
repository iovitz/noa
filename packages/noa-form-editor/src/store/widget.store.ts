import { makeAutoObservable } from 'mobx'

export class WidgetStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export const widgetStore = new WidgetStore()

export const useWidgetStore = () => widgetStore
