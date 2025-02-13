import { useFormEditorStore } from '@/store/editor/editor.store'
import { Input, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

const TextProperty = observer(({ widgetId }: { widgetId: string }) => {
  const editorStore = useFormEditorStore()
  const [value, setValue] = useState('')
  const currentWidgetProperty = editorStore.getWidgetById(widgetId)!.property as {
    text?: string
  }

  useEffect(() => {
    setValue(currentWidgetProperty.text ?? '')
  }, [widgetId])

  return (
    <div>
      <Title level={5}>内容文本</Title>
      {currentWidgetProperty.text}
      <Input
        placeholder="请输入内容"
        value={value}
        size="large"
        onChange={v => setValue(v.target.value)}
        onBlur={(e) => {
          editorStore.updateWidget(widgetId, {
            text: e.target.value ?? '',
          })
        }}
      />
    </div>
  )
})

export default TextProperty
