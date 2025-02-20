import { useFormEditorStore } from '@/store/editor/editor.store'
import { TextAttributes, WidgetData } from '@/widgets'
import { Typography } from 'antd'
import React from 'react'

const { Paragraph } = Typography

export const FormTextWidget = (props: { id: string }) => {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetData<TextAttributes>
  return (
    <Paragraph style={{ margin: 0, padding: '0 10px' }}>
      {widget.attributes.text || '文本内容'}
    </Paragraph>
  )
}
