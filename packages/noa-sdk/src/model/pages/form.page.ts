import { Page } from './base.page'
import { FormPageSerialized } from './types'

export class FormPage extends Page {
  fetchInitialData() {
    return Promise.resolve('' as unknown as FormPageSerialized)
  }

  initial(pageData: FormPageSerialized): boolean {
    super.initial(pageData)
    return true
  }
}
