import { BaseCommand, CommandManagerContext } from './command.types'

export class CommandManager {
  constructor(private context: CommandManagerContext) {
  }

  execute(command: BaseCommand) {
    console.error(command)
  }

  undo() {

  }

  redo() {}
}
