import { makeAutoObservable } from 'mobx'

export class WidgetStore {
  private selectedWidgetId = ''

  constructor() {
    makeAutoObservable(this)
  }

  handleSelectWidget(id: string) {
    this.selectedWidgetId = id
  }

  handleCancelSelectWidget() {
    this.selectedWidgetId = ''
  }

  getCurrentSelectedId() {
    return this.selectedWidgetId
  }
}

export const widgetStore = new WidgetStore()

export const useWidgetStore = () => widgetStore
