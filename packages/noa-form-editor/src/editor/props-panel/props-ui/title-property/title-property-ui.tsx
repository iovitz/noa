import { useFormEditorStore } from '@/store/editor/editor.store'
import { Input, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

export const TitlePropertyUI = observer(({ widgetId }: { widgetId: string }) => {
  const editorStore = useFormEditorStore()
  const [value, setValue] = useState('')
  const currentWidgetProperty = editorStore.getWidgetById(widgetId)!.property as {
    title?: string
  }

  useEffect(() => {
    setValue(currentWidgetProperty.title ?? '')
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
        showCount
        maxLength={100}
      />
    </div>
  )
})
