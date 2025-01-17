import { WidgetPropertyTypeMap, WidgetUnionType } from '../widgets'
import { CommandName } from './command.const'

export interface CommandOptionBase {
  id: string
  command: CommandName
}

export interface AddWidgetOption extends CommandOptionBase {
  command: CommandName.WidgetAdd
  id: string
  type: keyof WidgetPropertyTypeMap
  property: WidgetUnionType
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
  property: Partial<WidgetUnionType>
}

export type CommandOption = AddWidgetOption | DelWidgetOption | MoveWidgetOption | UpdateWidgetOption
