import { makeAutoObservable } from 'mobx'

export class WidgetStore {
  selectedWidgetId = ''

  constructor() {
    makeAutoObservable(this)
  }

  handleSelectWidget(id: string) {
    this.selectedWidgetId = id
  }
}

export const widgetStore = new WidgetStore()

export const useWidgetStore = () => widgetStore
