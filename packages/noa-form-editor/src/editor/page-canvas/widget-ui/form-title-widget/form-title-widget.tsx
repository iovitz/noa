import { useFormEditorStore } from '@/store/editor/editor.store'
import { TitleProperty, WidgetProps } from '@/widgets'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

export const FormTitleWidget = (props: { id: string }) => {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetProps<TitleProperty>
  return (
    <Title
      style={{
        margin: 0,
      }}
      level={widget.property.titleLevel as any ?? 3}
    >
      {widget.property.title || '一级标题'}
    </Title>
  )
}
