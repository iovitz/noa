import { Page } from '../page'
import { CommandName } from './command.const'
import { AddCompOption, CommandOption } from './component.option'

export interface CommandExecutor<T = CommandOption> {
  execute: (page: Page, option: T) => {
    undo: () => void
  }
}

const addCompExecutor: CommandExecutor<AddCompOption> = {
  execute(page, _option) {
    // page.addComponent()
    // option.type
    return {
      undo() {
        page.delComp('123')
      },
    }
  },
}

export function addCommandExecutor() {}

export const ExecutorMap: Record<CommandName, CommandExecutor> = {
  [CommandName.CompAdd]: addCompExecutor,
}
