import { mergeWith } from 'lodash'
import { EditWidgetRecord, WidgetChange, WidgetCommandTypes } from './editor.store.types'

export class EditorChangesetManager {
  private widgetChangeRecords: WidgetChange[] = []

  add(change: WidgetChange) {
    this.widgetChangeRecords.push(change)
  }

  clear() {
    this.widgetChangeRecords = []
  }

  dequeue() {
    const firstChange = this.widgetChangeRecords.shift()
    if (!firstChange) {
      return null
    }
    switch (firstChange.command) {
      case WidgetCommandTypes.Add:
        return firstChange
      case WidgetCommandTypes.Edit:
        const sameWidgetChanges = this.widgetChangeRecords.filter(({ widgetId: id }) => id === firstChange.widgetId) as EditWidgetRecord[]

        if (sameWidgetChanges.length) {
          this.widgetChangeRecords = this.widgetChangeRecords.filter(item => !sameWidgetChanges.includes(item as EditWidgetRecord))
        }

        // 合并变更的Props属性
        const editProps = sameWidgetChanges.map((item: EditWidgetRecord) => item.property)
        const changeProps: EditWidgetRecord['property'] = mergeWith({}, firstChange.property, ...editProps)
        return {
          widgetId: firstChange.widgetId,
          command: WidgetCommandTypes.Edit,
          property: changeProps,
        } as EditWidgetRecord
    }
  }
}
