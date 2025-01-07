import { Button, Space } from 'antd'
import React from 'react'

export default function CompList() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Button type="dashed" block>
        单行输入
      </Button>
      <Button type="dashed" block>
        多行输入
      </Button>
      <Button type="dashed" block>
        单选
      </Button>
      <Button type="dashed" block>
        多选
      </Button>
      <Button type="dashed" block>
        日期
      </Button>
      <Button type="dashed" block>
        日期范围
      </Button>
      <Button type="dashed" block>
        数字
      </Button>
      <Button type="dashed" block>
        数字范围
      </Button>
      <Button type="dashed" block>
        附件
      </Button>
    </Space>
  )
}
