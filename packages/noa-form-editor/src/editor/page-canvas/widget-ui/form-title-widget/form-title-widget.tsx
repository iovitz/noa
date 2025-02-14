import { useFormEditorStore } from '@/store/editor/editor.store'
import { TitleProperty, WidgetProps } from '@/widgets'
import { Typography } from 'antd'
import React, { PropsWithChildren } from 'react'

const { Title } = Typography

export const FormTitleWidget = (props: { id: string }) => {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetProps<TitleProperty>
  return (
    <Title level={widget.property.titleLevel as any ?? 1}>{widget.property.title ?? '123'}</Title>
  )
}
