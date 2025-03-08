import { useFormEditorStore } from '@/store/editor/editor.store'
import { TitleAttributes, WidgetData } from '@/widgets'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

export const FormTitleWidget = (props: { id: string }) => {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetData<TitleAttributes>
  return (
    <Title
      style={{
        margin: 0,
        padding: '0 10px',
      }}
      level={widget.attributes.titleLevel as any ?? 3}
    >
      {widget.attributes.title || '标题文本'}
    </Title>
  )
}
