import type { ErrorInfo } from 'react'
import React from 'react'

interface ErrorHandlerProp {
  children: JSX.Element
}

export default class ErrorHandler extends React.PureComponent<ErrorHandlerProp> {
  constructor(props: ErrorHandlerProp) {
    super(props)
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('!!!React Did Catch', error, info)
  }

  render() {
    return <>{this.props.children || null}</>
  }
}
