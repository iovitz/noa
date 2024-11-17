import React from 'react'
import { createRoot } from 'react-dom/client'
import { PageType } from './core'
import BasePage from './page/base.page'
import FormPage from './page/form.page'
import H5Page from './page/h5.page'

export class Editor {
  private pageId: string
  private el: HTMLElement
  pageType: PageType

  constructor({ el, pageId, pageType }: {
    el: HTMLElement
    pageId: string
    pageType: PageType
  }) {
    this.el = el
    this.pageId = pageId
    this.pageType = pageType
  }

  getPageComp(pageType: PageType) {
    switch (pageType) {
      case PageType.Form:
        return FormPage
      case PageType.Resume:
        return FormPage
      case PageType.H5:
        return H5Page
      default: return BasePage
    }
  }

  render() {
    const PageComp = this.getPageComp(this.pageType)
    createRoot(this.el).render(
      <PageComp pageId={this.pageId} />,
    )
  }
}
