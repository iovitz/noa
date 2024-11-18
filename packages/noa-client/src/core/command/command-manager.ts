import { Page } from '../pages'
import { BaseCommand } from './commands.types'

export class CommandManager {
  constructor(private page: Page) {
  }

  execute(command: BaseCommand) {
    console.error(command)
  }
}
