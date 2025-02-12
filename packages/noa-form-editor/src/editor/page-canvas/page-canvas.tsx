import FormTitle from '@/editor/page-canvas/widget-ui/form-title/form-title'
import { useFormEditorStore } from '@/store/editor/editor.store'
import { Space, theme } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WidgetWrapper } from './widget-wrapper'

const { useToken } = theme

const PageCanvas = observer(() => {
  const { token } = useToken()
  const editorStore = useFormEditorStore()
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: token.colorFillSecondary,
    }}
    >
      <div style={{
        width: 375,
        height: 667,
        overflowY: 'scroll',
        backgroundColor: '#fff',
      }}
      >
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          {
            [...editorStore.widgetMap.values()].map(widget => (
              <WidgetWrapper key={widget.id} id={widget.id} />
            ))
          }
          <FormTitle>调查问卷哈哈哈</FormTitle>
        </Space>
      </div>
    </div>
  )
})
export default PageCanvas
