import { observer } from 'mobx-react-lite'
import React from 'react'
import { useFormEditorStore } from '../../store/editor.store'

const PropsPanel = observer(() => {
  const editorStore = useFormEditorStore()
  return (
    <div>{editorStore.activeWidgetId}</div>
  )
})

export default PropsPanel
