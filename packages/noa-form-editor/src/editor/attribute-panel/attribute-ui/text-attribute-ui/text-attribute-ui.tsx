import { useFormEditorStore } from '@/store/editor/editor.store'
import { Input, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

export const TextAttributeUI = observer(({ widgetId }: { widgetId: string }) => {
  const editorStore = useFormEditorStore()
  const [value, setValue] = useState('')
  const currentWidgetAttributes = editorStore.getWidgetById(widgetId)!.attributes as {
    text?: string
  }

  useEffect(() => {
    setValue(currentWidgetAttributes.text ?? '')
  }, [widgetId])

  return (
    <div>
      <Title level={5}>内容文本</Title>
      <Input.TextArea
        placeholder="请输入内容"
        value={value}
        size="large"
        onChange={v => setValue(v.target.value)}
        onBlur={(e) => {
          editorStore.updateWidget(widgetId, {
            text: e.target.value ?? '',
          })
        }}
        showCount
        style={{ height: 120, resize: 'none' }}
        maxLength={1000}
      />
    </div>
  )
})
