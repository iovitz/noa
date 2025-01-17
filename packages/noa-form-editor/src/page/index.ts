import { findIndex } from 'lodash'
import { ComponentUnionType } from '../components'
import { FormSnapshot } from './page.types'

export * from './page.types'

export interface PageParams {
  id: string
}

export class FormPage {
  id: string

  name: string = ''

  private comps: ComponentUnionType [] = []

  constructor(params: PageParams) {
    this.id = params.id
  }

  addComp(comp: ComponentUnionType) {
    this.comps.push(comp)
  }

  hasComp(compId: string) {
    return this.comps.some(({ id }) => id === compId)
  }

  getComp(compId: string) {
    return this.comps.find(({ id }) => id === compId)
  }

  updateComp(compId: string, { property, ..._restParams }: Partial<ComponentUnionType>) {
    const comp = this.getComp(compId)
    if (!comp) {
      return false
    }
    if (property) {
      comp.property = {
        ...comp.property,
        ...property,
      }
    }
  }

  getAllComp(sort: boolean) {
    if (!sort) {
      return [...this.comps]
    }
    return this.comps.sort((a, b) => a.rank - b.rank)
  }

  delComp(id: string) {
    const index = findIndex(this.comps, item => item.id === id)
    if (!index) {
      return false
    }
    this.comps.splice(index, 1)
    return true
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
