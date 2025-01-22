import { CommandName } from '@/command'
import { AddWidgetOption } from '@/command/widget.option'
import { FormPageController } from '@/controller'
import { EventContext, EventName } from '@/controller/events.types'
import { IOClient } from '@/io'
import { WidgetTypes } from '@/widgets'
import { makeAutoObservable } from 'mobx'

export class FormEditorStore {
  formPageController?: FormPageController

  currentFileId = ''

  activeWidgetId = ''

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

  setActiveWidgetId(id: string) {
    this.activeWidgetId = id
  }

  unbindEvent() {
    this.formPageController?.off(EventName.WidgetUpdate, this.handleWidgetUpdate)
  }

  addWidget(type: WidgetTypes) {
    console.error('add widget: ', type)
    this.formPageController?.do({
      command: CommandName.WidgetAdd,
      id: this.currentFileId,
      type,
      property: {},
    } as AddWidgetOption)
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
