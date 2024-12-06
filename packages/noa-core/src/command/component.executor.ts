import { FormPage } from '../page'
import { CommandName } from './command.const'
import { AddCompOption, CommandOption, MoveCompOption } from './component.option'

export interface CommandExecutor<T extends CommandOption> {
  execute: (page: FormPage, option: T) => {
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

const updateCompExecutor: CommandExecutor<AddCompOption> = {
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

const delCompExecutor: CommandExecutor<AddCompOption> = {
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

const moveCompExecutor: CommandExecutor<MoveCompOption> = {
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

export const ExecutorMap = {
  [CommandName.CompAdd]: addCompExecutor,
  [CommandName.CompUpdate]: updateCompExecutor,
  [CommandName.CompDelete]: delCompExecutor,
  [CommandName.CompMove]: moveCompExecutor,
} as const
