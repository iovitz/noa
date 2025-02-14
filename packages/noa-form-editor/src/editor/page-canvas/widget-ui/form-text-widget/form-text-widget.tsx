import { useFormEditorStore } from '@/store/editor/editor.store'
import { TextProperty, WidgetProps } from '@/widgets'
import { Typography } from 'antd'
import React from 'react'

const { Paragraph } = Typography

export const FormTextWidget = (props: { id: string }) => {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetProps<TextProperty>
  return (
    <Paragraph>
      {widget.property.text || <blockquote>暂未填入文本</blockquote>}
    </Paragraph>
  )
}
