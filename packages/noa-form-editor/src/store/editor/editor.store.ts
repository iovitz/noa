import { IOClient } from '@/io'
import { logger } from '@/logger'
import { Widget, WidgetAttributes, WidgetAttributesTypeMap } from '@/widgets'
import { makeAutoObservable } from 'mobx'
import { ulid } from 'ulid'
import { WidgetCommandTypes, WidgetRequestMethod } from './editor.store.types'
import { EditorChangesetManager } from './editor-changeset-manager'

export class FormEditorStore {
  currentFileId = '' // 当前正在展示的文件ID

  syncing = false // 数据是否正在同步中

  io!: IOClient

  logger = logger.getLogger('FormEditorStore')

  widgetMap = new Map<string, Widget>()

  changeManager = new EditorChangesetManager()

  constructor() {
    makeAutoObservable(this, { setIO: false, logger: false, io: false })
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

  async delWidget(widgetId: string) {
    this.logger.info('delWidget', widgetId)
  }

  async addWidget<T extends keyof WidgetAttributesTypeMap>(attributes: Omit<WidgetAttributesTypeMap[T], 'rank' | 'hidden'>) {
    if (this.widgetMap.size + 1 > 200) {
      this.logger.info('addWidget', 'widget数量已达上限')
      return
    }
    const widgetId = ulid()
    // 计算最大的rank
    // TODO rank可以状态化，避免每次都计算
    const rank = [...this.widgetMap.values()].reduce((acc, cur) => Math.max(acc, cur.attributes.rank ?? -1), 0) + 1
    this.widgetMap.set(widgetId, {
      id: widgetId,
      attributes: {
        ...attributes,
        rank,
        hidden: false,
        deleted: false,
      },
    })

    this.logger.info('addWidget', widgetId, {
      ...this.widgetMap.get(widgetId)?.attributes,
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
      this.logger.info('addWidget', 'widget数量已达上限')
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
