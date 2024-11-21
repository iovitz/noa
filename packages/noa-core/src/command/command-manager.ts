import { Page } from '../pages/page'
import { BaseCommand } from './command.types'

export class CommandManager {
  constructor(private page: Page) {
  }

  execute(command: BaseCommand) {
    console.error(command)
  }
}
