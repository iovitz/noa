import { Form } from 'antd'
import React from 'react'
import TextFormWidget from '../widget/text.form'
import BasePage from './base.page'

export default class FormPage extends BasePage {
  render() {
    return (
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <TextFormWidget />
      </Form>
    )
  }
}
