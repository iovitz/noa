import { ulid } from 'ulid'
import { FormPage } from '../page'
import { WidgetFactory } from '../widgets'
import { CommandName } from './command.const'
import { ExecuteCommandFailResult, ExecuteCommandSuccessResult } from './command.types'
import { AddWidgetOption, CommandOption, DelWidgetOption, MoveWidgetOption, UpdateWidgetOption } from './widget.option'

export enum CommandExecuteResult {
  Success = 'success',
  Fail = 'fail',
  Cancel = 'cancel',
}

export interface CommandExecutor<T extends CommandOption> {
  execute: (page: FormPage, option: T) => ExecuteCommandFailResult | ExecuteCommandSuccessResult
}

const addWidgetExecutor: CommandExecutor<AddWidgetOption> = {
  execute(page, option) {
    const id = ulid()
    if (page.hasWidget(id)) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'Widget already exist',
      }
    }

    const newWidget = WidgetFactory.createWidget(option.type, option.property as any)

    page.addWidget(newWidget)

    return {
      undoCommand: {
        command: CommandName.WidgetDelete,
        id,
      },
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

const updateWidgetExecutor: CommandExecutor<UpdateWidgetOption> = {
  execute(page, option) {
    if (page.hasWidget(option.id)) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'Widget already exist',
      }
    }

    page.updateWidget(option.id, option.property)

    return {
      undoCommand: {
        command: CommandName.WidgetDelete,
        id: option.id,
      },
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

const delWidgetExecutor: CommandExecutor<DelWidgetOption> = {
  execute(page, option) {
    const widgetId = ulid()
    const widget = page.getWidget(widgetId)
    if (!widget) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'Widget not exist',
      }
    }

    page.delWidget(widget.id)

    return {
      undoCommand: {
        command: CommandName.WidgetAdd,
        id: widgetId,
        type: widget.type,
        property: {
          id: widgetId,
          name: widget.name,
          description: widget.description,
          rank: widget.rank,
          hidden: widget.hidden,
          type: widget.type,
          property: widget.property,
        },
      } as AddWidgetOption,
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

const moveWidgetExecutor: CommandExecutor<MoveWidgetOption> = {
  execute(page, option) {
    const id = ulid()
    if (page.hasWidget(id)) {
      return {
        result: CommandExecuteResult.Fail,
        reason: 'Widget already exist',
      }
    }

    return {
      undoCommand: {
        command: CommandName.WidgetDelete,
        id,
      },
      redoCommand: option,
      result: CommandExecuteResult.Success,
    }
  },
}

export const ExecutorMap = {
  [CommandName.WidgetAdd]: addWidgetExecutor,
  [CommandName.WidgetUpdate]: updateWidgetExecutor,
  [CommandName.WidgetDelete]: delWidgetExecutor,
  [CommandName.WidgetMove]: moveWidgetExecutor,
} as const
