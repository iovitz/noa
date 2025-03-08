import { useFormEditorStore } from '@/store/editor/editor.store'
import { VideoAttributes, WidgetData } from '@/widgets'
import { Image } from 'antd'
import React from 'react'

export default function FormVideo(props: { id: string }) {
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id) as WidgetData<VideoAttributes>
  return (
    <Image
      preview={{
        destroyOnClose: true,
        // imageRender: () => (
        //   <video
        //     muted
        //     width="100%"
        //     controls
        //     src={widget.attributes.videoUrl}
        //   />
        // ),
        toolbarRender: () => null,
      }}
      src={widget.attributes.videoUrl}
    />
  )
}
