import { ComponentParams, FormComponent } from '../components'
import { CommandName } from './command.const'

export interface CommandOptionBase {
  compId: string
  command: CommandName
}

export interface AddCompOption extends CommandOptionBase {
  command: CommandName.CompAdd
  type: FormComponent
}

export interface MoveCompOption extends CommandOptionBase {
  command: CommandName.CompMove
  index: number
  newIndex: number
}

export interface UpdateCompOption {
  command: CommandName.CompUpdate
  property: Partial<ComponentParams>
}

export type CommandOption = AddCompOption | MoveCompOption | UpdateCompOption
