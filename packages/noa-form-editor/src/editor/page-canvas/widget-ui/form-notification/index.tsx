import { useFormEditorStore } from '@/store/editor/editor.store'
import { NotificationAttributes, WidgetData } from '@/widgets'
import { Alert } from 'antd'
import React from 'react'

export const FormNotificationWidget = (props: { id: string }) => {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetData<NotificationAttributes>
  return (
    <Alert
      message={widget.attributes.title || '描述信息'}
      description={widget.attributes.text}
      type={widget.attributes.noticeType as any ?? 'info'}
    />
  )
}
