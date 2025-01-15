import { UnorderedListOutlined } from '@ant-design/icons'
import { Card, Col, Row, Space, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

export default function CompList() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>视频播放组件</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>轮播图组件</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>卡片组件</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>列表组件</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>图片</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>文本</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>分割线</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>富文本</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>二维码</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>提示信息</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>文本</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text> 多行文本</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>单选</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>多选</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>日期</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>日期范围</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} size="small">
            <Space>
              <UnorderedListOutlined />
              <Text>数字</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
