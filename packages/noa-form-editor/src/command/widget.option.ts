import { Widget, WidgetPropertyTypeMap } from '../widgets'
import { CommandName } from './command.const'

export interface CommandOptionBase {
  id: string
  command: CommandName
}

export interface AddWidgetOption extends CommandOptionBase {
  command: CommandName.WidgetAdd
  id: string
  type: keyof WidgetPropertyTypeMap
  property: Widget
}

export interface DelWidgetOption extends CommandOptionBase {
  command: CommandName.WidgetDelete
  id: string
}

export interface MoveWidgetOption extends CommandOptionBase {
  command: CommandName.WidgetMove
  id: string
  index: number
  newIndex: number
}

export interface UpdateWidgetOption extends CommandOptionBase {
  command: CommandName.WidgetUpdate
  id: string
  property: Partial<Widget>
}

export type CommandOption = AddWidgetOption | DelWidgetOption | MoveWidgetOption | UpdateWidgetOption
