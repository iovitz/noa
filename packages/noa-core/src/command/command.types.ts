import { CommandName } from './command.const'

export interface BaseCommand {
  command: CommandName
  pageId: string
  compId: string
}

export interface ChangeFieldNameCommand extends BaseCommand {
  command: CommandName.CompProperty
  data: {
    oldName: string
    newName: string
  }
}
