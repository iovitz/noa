import React, { Component } from 'react'
import { PageType } from './model/pages/constans'
import { FormPage } from './model/pages/form.page'

interface Props {
  id: string
}

export default class FormEditorContainer extends Component {
  private page: FormPage

  constructor(props: Props) {
    super(props)

    this.page = new FormPage(props.id, PageType.Form)
  }

  render() {
    const { page } = this
    return (
      <>
        <div>NoaController</div>
        {
          page.isLoaded ? 'Loaded' : 'Loading'
        }
      </>
    )
  }
}
