import { WidgetTypes } from '@/widgets'
import { makeAutoObservable } from 'mobx'

export class WidgetStore {
  contentWidgets = [
  ]

  formWidgets = [
  ]

  constructor() {
    makeAutoObservable(this)
  }
}

export const widgetStore = new WidgetStore()

export const useWidgetStore = () => widgetStore
