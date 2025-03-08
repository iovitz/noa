import { useFormEditorStore } from '@/store/editor/editor.store'
import { Select, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

export const NotificationTypeAttribute = observer(({ widgetId }: { widgetId: string }) => {
  const editorStore = useFormEditorStore()
  const [value, setValue] = useState('1')
  const currentWidgetAttributes = editorStore.getWidgetById(widgetId)!.attributes as {
    noticeType?: string
  }

  useEffect(() => {
    setValue(currentWidgetAttributes.noticeType ?? 'info')
  }, [widgetId])

  return (
    <div>
      <Title level={5}>标题</Title>
      <Select
        style={{ width: '100%' }}
        onChange={(v) => {
          setValue(v)
          editorStore.updateWidget(widgetId, {
            noticeType: v,
          })
        }}
        variant="filled"
        value={value}
        options={[
          { value: 'info', label: <span>提示信息</span> },
          { value: 'success', label: <span>成功信息</span> },
          { value: 'warning', label: <span>警告信息</span> },
          { value: 'error', label: <span>错误信息</span> },
        ]}
      />
    </div>
  )
})
