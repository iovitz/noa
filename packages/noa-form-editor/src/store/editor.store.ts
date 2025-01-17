import { makeAutoObservable } from 'mobx'
import { FormPageController } from '../controller'
import { EventContext, EventName } from '../controller/events.types'
import { IOClient } from '../io'
import { WidgetTypes } from '../widgets'

export class FormEditorStore {
  formPageController?: FormPageController

  currentFileId = ''

  componentList: any[] = []

  constructor() {
    makeAutoObservable(this, { formPageController: false, initEvent: false })
  }

  loadPage(id: string, io: IOClient) {
    this.currentFileId = id
    this.formPageController = new FormPageController({
      id,
      io,
      needWatch: true,
    })
    this.initEvent()
  }

  initEvent() {
    this.formPageController?.on(EventName.WidgetUpdate, this.handleWidgetUpdate)
  }

  unbindEvent() {
    this.formPageController?.off(EventName.WidgetUpdate, this.handleWidgetUpdate)
  }

  addWidget(type: WidgetTypes) {
    console.error('add widget: ', type)
  }

  handleWidgetUpdate = (info: EventContext[EventName.WidgetUpdate]) => {
    console.error('update: ', info)
  }

  destroy() {
    this.formPageController?.destroy()
  }
}

export const formEditorStore = new FormEditorStore()

export const useFormEditorStore = () => formEditorStore
