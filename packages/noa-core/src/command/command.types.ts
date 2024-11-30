import type { Page } from '../page'
import { CommandName } from './command.const'

export interface CommandManagerContext {}

export interface BaseCommand {
  command: CommandName
  pageId: string
  compId: string
  execute: (page: Page) => {
    undo: (page: Page) => BaseCommand
    redo: (page: Page) => BaseCommand
    res: boolean
  }
}

export interface ChangeFieldNameCommand extends BaseCommand {
  command: CommandName.CompUpdate
  data: {
    oldName: string
    newName: string
  }
}

export type Command = ChangeFieldNameCommand
