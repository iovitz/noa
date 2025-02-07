import FormImage from '@/editor/page-canvas/widget-ui/form-image'
import FormNotice from '@/editor/page-canvas/widget-ui/form-notice'
import FormTitle from '@/editor/page-canvas/widget-ui/form-title/form-title'
import FormVideo from '@/editor/page-canvas/widget-ui/form-video'
import WidgetOperator from '@/editor/page-canvas/widget-ui/widget-operator'
import { Space, theme } from 'antd'
import React from 'react'

const { useToken } = theme

export default function PageCanvas() {
  const { token } = useToken()
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
          <FormTitle>调查问卷哈哈哈</FormTitle>
          <FormNotice text="123123" title="123123" />
          <FormVideo poster="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"></FormVideo>
          <WidgetOperator name="123">
            <FormImage src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"></FormImage>
          </WidgetOperator>
        </Space>
      </div>
    </div>
  )
}
