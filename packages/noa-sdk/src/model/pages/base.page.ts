import { PageType } from './constans'
import { PageSerialized } from './types'

export abstract class Page {
  protected loaded = false
  protected name: string
  protected shared: boolean
  protected rev: number

  constructor(public noaId: string, public type: PageType) {
    this.bootstrap()
  }

  public async bootstrap() {
    const pageData = await this.fetchInitialData()
    this.initial(pageData)
  }

  abstract fetchInitialData(): Promise<PageSerialized>

  get isLoaded() {
    return this.loaded
  }

  initial(pageData: PageSerialized) {
    this.name = pageData.name
    this.rev = pageData.rev
    this.shared = pageData.shared
  }
}
