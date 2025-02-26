import { useFormEditorStore } from '@/store/editor/editor.store'
import { Input, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

export const TitleAttributesUI = observer(({ widgetId }: { widgetId: string }) => {
  const editorStore = useFormEditorStore()
  const [value, setValue] = useState('')
  const currentWidgetAttributes = editorStore.getWidgetById(widgetId)!.attributes as {
    title?: string
  }

  useEffect(() => {
    setValue(currentWidgetAttributes.title ?? '')
  }, [widgetId])

  return (
    <div>
      <Title level={5}>标题</Title>
      <Input
        placeholder="请输入内容"
        value={value}
        size="large"
        onChange={v => setValue(v.target.value)}
        onBlur={(e) => {
          editorStore.updateWidget(widgetId, {
            title: e.target.value ?? '',
          })
        }}
        variant="filled"
        showCount
        maxLength={100}
      />
    </div>
  )
})
