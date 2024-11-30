import { Page } from '../page'
import { CommandExecutor, ExecutorMap } from './component.executor'
import { CommandOption } from './component.option'

export * from './command.const'
export * from './command.types'

export function executeCommand(page: Page, option: CommandOption) {
  const { command } = option
  const executor: CommandExecutor = ExecutorMap[command]
  if (!command) {
    return false
  }
  return executor.execute(page, option)
}
