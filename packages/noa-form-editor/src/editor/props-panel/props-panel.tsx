import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import PropertyUIWrapper from './property-ui-wrapper'

const PropsPanel = observer(() => {
  const widgetStore = useWidgetStore()
  const editorStore = useFormEditorStore()

  const widget = editorStore.getWidgetById(widgetStore.selectedWidgetId)!

  if (!widget) {
    return <>Page Panel</>
  }
  const propsFields = Object.keys(widget.property)

  return (
    <>
      <div>{widgetStore.selectedWidgetId}</div>
      <div>{widget.property.type}</div>

      {
        propsFields.map(field => <PropertyUIWrapper key={field} field={field} widgetId={widgetStore.selectedWidgetId} />)
      }
    </>
  )
})

export default PropsPanel
