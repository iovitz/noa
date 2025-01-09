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
  public id: string

  private page: FormPage

  private engine: Engine

  eventManager = new Emittery({
    debug: {
      name: 'editor',
    },
  })

  get pageId() {
    return this.id
  }

  get pageName() {
    return this.page.name
  }

  constructor(params: ControllerParam) {
    this.id = params.id
    this.page = new FormPage({
      id: params.id,
    })
    this.engine = new Engine(this.page, {
      io: params.io,
    })
  }

  loadPage() {
    this.engine.loadPage()
  }

  destroy() {
    this.engine.loadPage()
  }

  unwatch() {
    this.engine.unwatch()
  }

  watch() {
    this.engine.watch()
  }

  do(operate: CommandOption) {
    return executeCommand(this.page, operate)
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
