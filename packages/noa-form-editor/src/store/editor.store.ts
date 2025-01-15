import { makeAutoObservable } from 'mobx'
import { FormPageController } from '../controller'
import { EventContext, EventName } from '../controller/events.types'
import { IOClient } from '../io'

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
    this.formPageController?.on(EventName.ComponentUpdate, this.handleComponentUpdate)
  }

  unbindEvent() {
    this.formPageController?.off(EventName.ComponentUpdate, this.handleComponentUpdate)
  }

  handleComponentUpdate = (compInfo: EventContext[EventName.ComponentUpdate]) => {
    console.error('update: ', compInfo)
  }

  destroy() {
    this.formPageController?.destroy()
  }
}

export const formEditorStore = new FormEditorStore()

export const useFormEditorStore = () => formEditorStore
