import { EventContext, EventName } from '@/controller/events.types'
import { IOClient } from '@/io'
import { Widget, WidgetProperty, WidgetPropertyTypeMap } from '@/widgets'
import { makeAutoObservable } from 'mobx'
import { ulid } from 'ulid'
import { WidgetCommandTypes, WidgetRequestMethod } from './editor.store.types'
import { EditorChangesetManager } from './editor-changeset-manager'

export class FormEditorStore {
  currentFileId = '' // 当前正在展示的文件ID

  syncing = false // 数据是否正在同步中

  io!: IOClient

  widgetList: Widget[] = []

  changeManager = new EditorChangesetManager()

  constructor() {
    makeAutoObservable(this, { setIO: false })
  }

  setIO(io: IOClient) {
    this.io = io
  }

  loadPage(id: string) {
    this.currentFileId = id
  }

  async addWidget<T extends keyof WidgetPropertyTypeMap>(property: WidgetPropertyTypeMap[T]) {
    const widgetId = ulid()

    this.changeManager.add({
      command: WidgetCommandTypes.Add,
      widgetId,
      property,
    })
    this.batchUpdate()
  }

  async updateWidget(widgetId: string, property: Partial<WidgetProperty>) {
    this.changeManager.add({
      command: WidgetCommandTypes.Edit,
      widgetId,
      property,
    })
    this.batchUpdate()
  }

  async batchUpdate() {
    const change = this.changeManager.dequeue()
    if (!change)
      return

    this.syncing = true
    try {
      await this.io.request({
        url: `/form-page/${this.currentFileId}/widget/${change.widgetId}`,
        method: WidgetRequestMethod[change.command],
        data: change.command === WidgetCommandTypes.Delete
          ? null
          : {
              property: JSON.stringify(change.property),
            },
      })
    }
    catch (e) {
      console.error('syncing fail...', e)
    }
    finally {
      this.syncing = false
    }
  }

  handleWidgetUpdate = (info: EventContext[EventName.WidgetUpdate]) => {
    console.error('update: ', info)
  }

  destroy() {
    this.changeManager.clear()
  }
}

export const formEditorStore = new FormEditorStore()

export const useFormEditorStore = () => formEditorStore
