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
        boxSizing: 'border-box',
        padding: '10px',
      }}
      >
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          {
            // TODO 这里可能有性能损耗
            [...editorStore.widgetMap.values()].sort((a, b) => a.attributes.rank - b.attributes.rank).map(widget => (
              <WidgetWrapper key={widget.id} id={widget.id} />
            ))
          }
        </Space>
      </div>
    </div>
  )
})
export default PageCanvas
