import React, { Component } from 'react'

interface Props {
  pageId: string
}

export default class BasePage extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return <h1>Page Type Not Supposed</h1>
  }
}
