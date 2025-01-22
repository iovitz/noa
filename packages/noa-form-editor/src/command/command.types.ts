import type { FormPage } from '@/page'
import { CommandName } from './command.const'
import { CommandExecuteResult } from './widget.executor'
import { CommandOption } from './widget.option'

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
  id: string
  execute: (page: FormPage) => {
    undo: (page: FormPage) => BaseCommand
    redo: (page: FormPage) => BaseCommand
    res: boolean
  }
}

export interface ChangeFieldNameCommand extends BaseCommand {
  command: CommandName.WidgetAdd
  data: {
    oldName: string
    newName: string
  }
}

export type Command = ChangeFieldNameCommand
