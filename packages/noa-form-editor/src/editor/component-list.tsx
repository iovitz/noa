import { Button, Card, Space } from 'antd'
import { NoaFormInput, NoaFormTitle } from 'noa-form-ui'
import React from 'react'

export default function CompList() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Card bordered size="small">
        <NoaFormTitle title="标题" />
      </Card>
      <Card bordered size="small">
        <NoaFormInput question="问题是这个" />
      </Card>
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
