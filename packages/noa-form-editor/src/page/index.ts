import { findIndex } from 'lodash'
import { WidgetUnionType } from '../widgets'
import { FormSnapshot } from './page.types'

export * from './page.types'

export interface PageParams {
  id: string
}

export class FormPage {
  id: string

  name: string = ''

  private widgets: WidgetUnionType [] = []

  constructor(params: PageParams) {
    this.id = params.id
  }

  addWidget(widget: WidgetUnionType) {
    this.widgets.push(widget)
  }

  hasWidget(widgetId: string) {
    return this.widgets.some(({ id }) => id === widgetId)
  }

  getWidget(widgetId: string) {
    return this.widgets.find(({ id }) => id === widgetId)
  }

  updateWidget(widgetId: string, { property, ..._restParams }: Partial<WidgetUnionType>) {
    const widget = this.getWidget(widgetId)
    if (!widget) {
      return false
    }
    if (property) {
      widget.property = {
        ...widget.property,
        ...property,
      }
    }
  }

  getAllWidget(sort: boolean) {
    if (!sort) {
      return [...this.widgets]
    }
    return this.widgets.sort((a, b) => a.rank - b.rank)
  }

  delWidget(id: string) {
    const index = findIndex(this.widgets, item => item.id === id)
    if (!index) {
      return false
    }
    this.widgets.splice(index, 1)
    return true
  }

  fromJSON(data: FormSnapshot) {
    this.name = data.name
    this.id = data.id
    data.widgets.forEach((widget) => {
      this.addWidget(widget)
    })
  }

  toJSON() {

  }
}
