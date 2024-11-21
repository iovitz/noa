import { Command, CommandManager } from '../command'
import { BaseComp } from '../components/base.comp'
import { Engine } from '../engine'
import { IOClient, PageIO } from '../io'
import { Page } from '../page'

export interface ControllerParam {
  id: string
  io: PageIO
}

export class Controller {
  private id: string
  private page: Page
  private engine: Engine
  private commandManager = new CommandManager(this)

  constructor(params: ControllerParam) {
    this.id = params.id
    this.page = new Page({
      id: params.id,
      io: params.io ?? new IOClient({
        baseURL: '/api-noa',
        timeout: 20000,
        socketPath: '/api-noa/ws',
      }),
    })
  }

  execute(command: Command) {
    this.commandManager.execute(command)
  }

  undo() {
    this.commandManager.undo()
  }

  redo() {
    this.commandManager.redo()
  }
}
