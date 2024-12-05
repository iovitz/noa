import { ioClient, ServerData } from '@/shared/io/io'
import { makeAutoObservable } from 'mobx'
import { ComponentBase } from './editor.types'

export class EditorStore {
  compList: ComponentBase[] = []
  name = ''

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    this.compList = []
    this.name = ''
  }

  loadPage() {}
}
