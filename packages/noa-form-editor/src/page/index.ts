import { ComponentParams } from '../components'
import { FormSnapshot } from './page.types'

export * from './page.types'

export interface PageParams {
  id: string
  // type: PageType
}

export class FormPage {
  id: string

  name: string = ''

  private comps: ComponentParams [] = []

  constructor(params: PageParams) {
    this.id = params.id
  }

  addComp(comp: ComponentParams) {
    this.comps.push(comp)
  }

  hasComp(compId: string) {
    return this.comps.some(({ id }) => id === compId)
  }

  delComp(id: string) {
    return id
  }

  fromJSON(data: FormSnapshot) {
    this.name = data.name
    this.id = data.id
    data.components.forEach((comp) => {
      this.addComp(comp)
    })
  }

  toJSON() {

  }
}
