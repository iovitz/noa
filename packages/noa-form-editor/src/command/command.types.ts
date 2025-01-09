import type { FormPage } from '../page'
import { CommandName } from './command.const'
import { CommandExecuteResult } from './component.executor'
import { CommandOption } from './component.option'

export interface CommandManagerContext {}

export interface ExecuteCommandSuccessResult {
  undoCommand: CommandOption
  redoCommand: CommandOption
  result: CommandExecuteResult.Success
}
export interface ExecuteCommandFailResult {
  reason: string
  result: CommandExecuteResult.Fail
}

export interface BaseCommand {
  command: CommandName
  pageId: string
  compId: string
  execute: (page: FormPage) => {
    undo: (page: FormPage) => BaseCommand
    redo: (page: FormPage) => BaseCommand
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
