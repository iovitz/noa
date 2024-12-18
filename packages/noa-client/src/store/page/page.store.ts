import { ioClient } from '@/shared/io/io'
import { logger } from '@/shared/logger/logger'
import { action, makeObservable, observable } from 'mobx'
import { FormPageController } from 'noa-core'
import { CommandOption } from 'noa-core/src/command/component.option'

export class PageStore {
  name = 0

  controller?: FormPageController

  private logger = logger.getLogger('EditorStore')

  constructor() {
    makeObservable(this, {
      name: observable,
      setName: action,
    })
  }

  reset() {
    this.logger.info('reset')
    this.controller = void 0
  }

  setName() {
    this.name++
  }

  loadPage(pageId: string) {
    const controller = new FormPageController({
      id: pageId,
      io: ioClient,
      needWatch: true,
    })
    this.controller = controller
  }

  execute(option: CommandOption) {
    return this.controller?.do(option)
  }

  undo() {
    this.controller?.undo()
  }

  redo() {
    this.controller?.redo()
  }

  watch() {
    return this.controller?.watch()
  }

  unwatch() {
    return this.controller?.unwatch()
  }
}
