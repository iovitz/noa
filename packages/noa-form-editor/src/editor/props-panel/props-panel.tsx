import { useFormEditorStore } from '@/store/editor.store'
import { observer } from 'mobx-react-lite'
import React from 'react'

const PropsPanel = observer(() => {
  const editorStore = useFormEditorStore()
  return (
    <div>{editorStore.activeWidgetId}</div>
  )
})

export default PropsPanel
