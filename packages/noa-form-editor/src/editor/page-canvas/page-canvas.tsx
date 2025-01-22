import FormImage from '@/widget-ui/form-image'
import FormNotice from '@/widget-ui/form-notice'
import FormVideo from '@/widget-ui/form-video'
import WidgetOperator from '@/widget-ui/widget-operator'
import { Space } from 'antd'
import React from 'react'

export default function PageCanvas() {
  return (
    <div>
      <div>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
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
