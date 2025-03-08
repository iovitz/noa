import { useFormEditorStore } from '@/store/editor/editor.store'
import { Select, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

export const TitleLevelAttribute = observer(({ widgetId }: { widgetId: string }) => {
  const editorStore = useFormEditorStore()
  const [value, setValue] = useState('1')
  const currentWidgetAttributes = editorStore.getWidgetById(widgetId)!.attributes as {
    titleLevel?: number
  }

  useEffect(() => {
    setValue(currentWidgetAttributes.titleLevel ? `${currentWidgetAttributes.titleLevel}` : '1')
  }, [widgetId])

  return (
    <div>
      <Title level={5}>标题</Title>
      <Select
        style={{ width: '100%' }}
        onChange={(v) => {
          setValue(v)
          editorStore.updateWidget(widgetId, {
            titleLevel: Number(v),
          })
        }}
        variant="filled"
        value={value}
        options={[
          { value: '1', label: <span>一级标题</span> },
          { value: '2', label: <span>二级标题</span> },
          { value: '3', label: <span>三级标题</span> },
          { value: '4', label: <span>四级标题</span> },
          { value: '5', label: <span>五级标题</span> },
        ]}
      />
    </div>
  )
})
