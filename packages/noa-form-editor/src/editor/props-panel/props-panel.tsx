import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import { Space, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import PropertyUIWrapper from './property-ui-wrapper'

const { Title } = Typography

const PropsPanel = observer(() => {
  const widgetStore = useWidgetStore()
  const editorStore = useFormEditorStore()

  const widget = editorStore.getWidgetById(widgetStore.selectedWidgetId)!

  if (!widget) {
    return (
      <>
        <Title level={3}>属性面板</Title>
      </>
    )
  }
  const propsFields = Object.keys(widget.property)

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '10px',
      }}
    >
      <Title level={4}>属性面板</Title>
      {
        propsFields.map(field => <PropertyUIWrapper key={field} field={field} widgetId={widgetStore.selectedWidgetId} />)
      }
    </Space>
  )
})

export default PropsPanel
