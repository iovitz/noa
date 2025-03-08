import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import { Space, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import AttributeUIWrapper from './attribute-ui-wrapper'

const { Title } = Typography

const PropsPanel = observer(() => {
  const widgetStore = useWidgetStore()
  const editorStore = useFormEditorStore()

  const widget = editorStore.getWidgetById(widgetStore.getCurrentSelectedId())!

  if (!widget) {
    return (
      <>
        <Title level={3}>属性面板</Title>
      </>
    )
  }

  const attrFields = Object.keys(widget.attributes)

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
        attrFields.map(field => <AttributeUIWrapper key={field} field={field} widgetId={widgetStore.getCurrentSelectedId()} />)
      }
    </Space>
  )
})

export default PropsPanel
