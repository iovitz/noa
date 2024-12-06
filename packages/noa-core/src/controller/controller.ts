import type { PageIO } from '../io'
import Emittery from 'emittery'
import { executeCommand } from '../command'
import { CommandOption } from '../command/component.option'
import { Engine } from '../engine'
import { FormPage } from '../page'
import { EventContext, EventName } from './events.types'

export interface ControllerParam {
  id: string
  io: PageIO
  needWatch: boolean
}

export class FormPageController {
  public name = ''
  public id: string
  private page: FormPage
  private engine?: Engine
  private eventManager = new Emittery({
    debug: {
      name: 'editor',
    },
  })

  constructor(params: ControllerParam) {
    this.id = params.id
    this.page = new FormPage({
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

  on<T extends EventName>(eventName: T, fn: (eventData: EventContext[T]) => void | Promise<void>) {
    // 使用 eventManager 的 on 方法监听指定事件，并在事件触发时执行回调函数
    this.eventManager.on(eventName, fn)
  }

  off<T extends EventName>(eventName: T, fn: (eventData: EventContext[T]) => void | Promise<void>) {
    this.eventManager.off(eventName, fn)
  }
}
