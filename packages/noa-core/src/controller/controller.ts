import type { PageIO } from '../io'
import { executeCommand } from '../command'
import { CommandOption } from '../command/component.option'
import { Engine } from '../engine'
import { Page } from '../page'

export interface ControllerParam {
  id: string
  io: PageIO
  needWatch: boolean
}

export class Controller {
  public id: string
  private page: Page
  private engine: Engine

  constructor(params: ControllerParam) {
    this.id = params.id
    this.page = new Page({
      id: params.id,
    })
    if (params.needWatch) {
      this.engine = new Engine(this, {
        io: params.io,
      })
    }
  }

  operate(operate: CommandOption) {
    executeCommand(this.page, operate)
  }

  undo() {
  }

  redo() {
  }
}
