import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WidgetUIMap } from './widget-ui'

export const WidgetWrapper = observer((props: { id: string }) => {
  const widgetStore = useWidgetStore()
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id)!

  const WidgetUI = WidgetUIMap[widget.property.type]
  if (!WidgetUI) {
    return null
  }

  const handleSelectWidget = () => {
    widgetStore.handleSelectWidget(props.id)
  }

  return (
    <div onClick={handleSelectWidget}>
      <WidgetUI id={props.id} />
    </div>
  )
})
