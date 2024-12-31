import { makeAutoObservable } from 'mobx'
import { SpaceFile } from './space.types'

export class SpaceStore {
  fileList: SpaceFile[] = []

  constructor() {
    makeAutoObservable(this)
  }
}
