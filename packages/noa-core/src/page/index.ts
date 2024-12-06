import { BaseComp } from '../components/base.comp'
import { Engine } from '../engine'

export interface PageParams {
  id: string
  // type: PageType
}

export class FormPage {
  private comps: BaseComp [] = []
  id: string
  private engine: Engine

  constructor(params: PageParams) {
    this.id = params.id
  }

  addComp(comp: BaseComp) {
    this.comps.push(comp)
  }

  delComp(id: string) {
    return id
  }

  fromJSON() {
    return {}
  }

  toJSON() {

  }
}
