import { CommandManager } from '../command'
import { BaseComp } from '../components/base.comp'
import { Engine } from '../engine'
import { IOClient, PageIO } from '../io'

export interface PageParams {
  id: string
  io: PageIO
}

export class Page {
  private comps: BaseComp [] = []
  name: string
  id: string
  private engine: Engine

  constructor(params: PageParams) {
    this.id = params.id
    this.engine = new Engine({
      pageId: params.id,
      io: params.io,
    })
  }

  addComponent(comp: BaseComp) {
    this.comps.push(comp)
  }

  fromJSON() {
    return {}
  }

  toJSON() {

  }
}
