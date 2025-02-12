import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import { Input } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const TextProperty = observer(() => {
  const editorStore = useFormEditorStore()
  const widgetStore = useWidgetStore()
  const [value, setValue] = useState('')
  useEffect(() => {
    const currentWidgetProperty = editorStore.getWidgetById(widgetStore.selectedWidgetId)!.property as {
      text?: string
    }
    setValue(currentWidgetProperty.text ?? '')
  }, [])
  return (
    <div>
      文本输入
      <Input
        placeholder="请输入内容"
        value={value}
        onChange={v => setValue(v.target.value)}
        onBlur={(e) => {
          editorStore.updateWidget(widgetStore.selectedWidgetId, {
            text: e.target.value ?? '',
          })
        }}
      />
    </div>
  )
})

export default TextProperty
