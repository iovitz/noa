import { WidgetProperty } from '@/widgets'
import { Method } from 'axios'

export enum WidgetCommandTypes {
  Add = 'Add',
  Edit = 'Edit',
  Delete = 'Delete',
}

export const WidgetRequestMethod: Record<WidgetCommandTypes, Method> = {
  [WidgetCommandTypes.Add]: 'post',
  [WidgetCommandTypes.Edit]: 'patch',
  [WidgetCommandTypes.Delete]: 'delete',
}

export interface AddWidgetRecord {
  widgetId: string
  command: WidgetCommandTypes.Add
  property: Partial<WidgetProperty>
}

export interface EditWidgetRecord {
  widgetId: string
  command: WidgetCommandTypes.Edit
  property: Partial<WidgetProperty>
}
export interface DeleteWidgetRecord {
  widgetId: string
  command: WidgetCommandTypes.Delete
}

export type WidgetChange = AddWidgetRecord | EditWidgetRecord | DeleteWidgetRecord
