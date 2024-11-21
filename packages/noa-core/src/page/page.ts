import { BaseComp } from '../components/base.comp'
import { IOClient, PageIO } from '../io'

export interface PageParams {
  id: string
  name: string
  io: PageIO
}

export class Page {
  private comps: BaseComp [] = []
  private io: PageIO
  name: string
  id: string

  constructor(params: PageParams) {
    this.name = params.name
    this.id = params.id
    this.io = params.io ?? new IOClient({
      baseURL: '/api-noa',
      timeout: 20000,
      socketPath: '/api-noa/ws',
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
