import { BaseComp } from '../components/base.comp'

export class Page {
  private comps: BaseComp []

  constructor(private id: string, private name: string) {

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
