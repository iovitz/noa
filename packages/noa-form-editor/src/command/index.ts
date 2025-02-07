import { FormPage } from '../page'
import { ExecuteResult } from './command.types'
import { CommandExecuteResult, ExecutorMap } from './widget.executor'
import { CommandOption } from './widget.option'

export * from './command.const'
export * from './command.types'

export function executeCommand(page: FormPage, option: CommandOption): ExecuteResult {
  const { command } = option
  const executor = ExecutorMap[command]
  if (!executor) {
    return {
      reason: `No such executor: ${command}`,
      result: CommandExecuteResult.Fail,
    }
  }
  // 返回脏区组件列表
  return executor.execute(page, option as never)
}
