import { useFormEditorStore } from '@/store/editor/editor.store'
import { ImageAttributes, WidgetData } from '@/widgets'
import { Empty, Image } from 'antd'
import React from 'react'

interface FormImageProps {
  id: string
}

export default function FormImage(props: FormImageProps) {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetData<ImageAttributes>
  return (
    widget.attributes.imageUrl ? <Image src={widget.attributes.imageUrl} preview={false} alt="niawefaf" /> : <Empty />
  )
}
