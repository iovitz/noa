import { ulid } from 'ulid'
import { ComponentFactory } from '../components'
import { FormPage } from '../page'
import { CommandName } from './command.const'
import { ExecuteCommandFailResult, ExecuteCommandSuccessResult } from './command.types'
import { AddCompOption, CommandOption, DelCompOption, MoveCompOption, UpdateCompOption } from './component.option'

export enum CommandExecuteResult {
  Success = 'success',
  Fail = 'fail',
  Cancel = 'cancel',
}

export interface CommandExecutor<T extends CommandOption> {
  execute: (page: FormPage, option: T) => ExecuteCommandFailResult | ExecuteCommandSuccessResult
}

const addCompExecutor: CommandExecutor<AddCompOption> = {
  execute(page, option) {
    const compId = ulid()
    // page.addComponent()
    // option.type
    if (page.hasComp(compId)) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'comp already exist',
      }
    }

    const newComp = ComponentFactory.createComp(option.type, option.property as any)

    page.addComp(newComp)

    return {
      undoCommand: {
        command: CommandName.CompDelete,
        compId,
      },
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

const updateCompExecutor: CommandExecutor<UpdateCompOption> = {
  execute(page, option) {
    const compId = ulid()
    // page.addComponent()
    // option.type
    if (page.hasComp(compId)) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'comp already exist',
      }
    }

    page.updateComp(option.property)

    return {
      undoCommand: {
        command: CommandName.CompDelete,
        compId,
      },
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

const delCompExecutor: CommandExecutor<DelCompOption> = {
  execute(page, option) {
    const compId = ulid()
    // page.addComponent()
    // option.type
    const comp = page.getComp(compId)
    if (!comp) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'comp not exist',
      }
    }

    page.delComp(option.compId)

    return {
      undoCommand: {
        command: CommandName.CompAdd,
        compId,
        type: comp.type,
        property: {
          id: compId,
          name: comp.name,
          description: comp.description,
          rank: comp.rank,
          hidden: comp.hidden,
          type: comp.type,
          property: comp.property,
        },
      } as AddCompOption,
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

const moveCompExecutor: CommandExecutor<MoveCompOption> = {
  execute(page, option) {
    const compId = ulid()
    // page.addComponent()
    // option.type
    if (page.hasComp(compId)) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'comp already exist',
      }
    }

    return {
      undoCommand: {
        command: CommandName.CompDelete,
        compId,
      },
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

export const ExecutorMap = {
  [CommandName.CompAdd]: addCompExecutor,
  [CommandName.CompUpdate]: updateCompExecutor,
  [CommandName.CompDelete]: delCompExecutor,
  [CommandName.CompMove]: moveCompExecutor,
} as const
