import { ioClient } from '@/shared/io/io'
import { makeAutoObservable } from 'mobx'
import { FormPageController } from 'noa-core'

export class EditorStore {
  controller?: FormPageController

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    this.controller = void 0
  }

  loadPage(pageId: string) {
    const controller = new FormPageController({
      id: pageId,
      io: ioClient,
      needWatch: true,
    })
    this.controller = controller
  }
}
