import { FormPage } from './form.page'
import { H5Page } from './h5.page'
import { Page } from './page'
import { PageType } from './page.const'
import { ResumePage } from './resume.page'

export * from './form.page'
export * from './page'
export * from './page.const'

export class PageFactory {
  private static PageMap: Record<PageType, typeof Page> = {
    [PageType.H5]: H5Page,
    [PageType.Form]: FormPage,
    [PageType.Resume]: ResumePage,
  }

  static getConstructor(type: PageType) {
    return this.PageMap[type]!
  }
}
