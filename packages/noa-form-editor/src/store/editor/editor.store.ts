import { IOClient } from '@/io'
import { Widget, WidgetAttributes, WidgetAttributesTypeMap } from '@/widgets'
import { makeAutoObservable } from 'mobx'
import { ulid } from 'ulid'
import { WidgetCommandTypes, WidgetRequestMethod } from './editor.store.types'
import { EditorChangesetManager } from './editor-changeset-manager'

export class FormEditorStore {
  currentFileId = '' // 当前正在展示的文件ID

  syncing = false // 数据是否正在同步中

  io!: IOClient

  widgetMap = new Map<string, Widget>()

  changeManager = new EditorChangesetManager()

  constructor() {
    makeAutoObservable(this, { setIO: false })
  }

  setIO(io: IOClient) {
    this.io = io
  }

  async loadPage(fileId: string) {
    this.currentFileId = fileId
    const data = await this.io.request({
      url: `/form-page/${fileId}/data`,
      method: 'get',
    })
    this.handleFormPageData(data.data)
  }

  handleFormPageData(data: any) {
    data.widgets.forEach((w: any) => {
      this.widgetMap.set(w.id, {
        id: w.id,
        attributes: w.attributes,
      })
    })
    console.error(this)
  }

  async addWidget<T extends keyof WidgetAttributesTypeMap>(attributes: WidgetAttributesTypeMap[T]) {
    const widgetId = ulid()
    this.widgetMap.set(widgetId, {
      id: widgetId,
      attributes,
    })

    this.changeManager.add({
      command: WidgetCommandTypes.Add,
      widgetId,
      attributes,
    })
    this.batchUpdate()
  }

  async updateWidget(widgetId: string, attributes: Partial<WidgetAttributes>) {
    this.changeManager.add({
      command: WidgetCommandTypes.Edit,
      widgetId,
      attributes,
    })
    const widget = this.getWidgetById(widgetId)!
    widget.attributes = {
      ...widget.attributes,
      ...attributes,
    }
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
              attributes: JSON.stringify(change.attributes),
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

  getWidgetById(id: string) {
    return this.widgetMap.get(id)
  }

  destroy() {
    this.changeManager.clear()
    this.widgetMap.clear()
  }
}

export const formEditorStore = new FormEditorStore()

export const useFormEditorStore = () => formEditorStore
