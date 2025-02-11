import { Widget, WidgetProperty, WidgetTypes } from '@/widgets'

export enum WidgetCommandTypes {
  Add = 'Add',
  Edit = 'Edit',
}

export interface AddWidgetRecord {
  widgetId: string
  type: WidgetTypes
  command: WidgetCommandTypes.Add
  property: Partial<WidgetProperty>
}

export interface EditWidgetRecord {
  widgetId: string
  command: WidgetCommandTypes.Edit
  property: Partial<WidgetProperty>
}

export type WidgetChange = AddWidgetRecord | EditWidgetRecord
