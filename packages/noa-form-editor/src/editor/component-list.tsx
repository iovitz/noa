import { Button, Col, Row, Space, Typography } from 'antd'
import React from 'react'
import { MdAttachFile, MdCheck, MdDateRange, MdGpsFixed, MdInfoOutline, MdInsertChartOutlined, MdLocalPhone, MdMoney, MdNumbers, MdOutlineCheckBox, MdOutlineCheckCircle, MdOutlineHorizontalRule, MdOutlineImage, MdOutlineInput, MdOutlinePercent, MdOutlineStarOutline, MdOutlineTextFields, MdOutlineVideocam } from 'react-icons/md'

const { Title } = Typography

export default function CompList() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Title level={4} style={{ textAlign: 'center' }}>内容组件</Title>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineTextFields />} block size="large">段落</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineVideocam />} block size="large">视频</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineImage />} block size="large">图片</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineHorizontalRule />} block size="large">横线</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdInfoOutline />} block size="large">提示</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdInsertChartOutlined />} block size="large">图表</Button>
        </Col>
      </Row>

      <Title level={4} style={{ textAlign: 'center' }}>表单组件</Title>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineInput />} block size="large">文本</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdNumbers />} block size="large">数字</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdLocalPhone />} block size="large">号码</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdMoney />} block size="large">金额</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlinePercent />} block size="large">进度</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineCheckCircle />} block size="large">单选</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineCheckBox />} block size="large">多选</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdCheck />} block size="large">复选</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdDateRange />} block size="large">时间</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdOutlineStarOutline />} block size="large">评分</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdGpsFixed />} block size="large">位置</Button>
        </Col>
        <Col span={12}>
          <Button type="dashed" icon={<MdAttachFile />} block size="large">附件</Button>
        </Col>
      </Row>
    </Space>
  )
}
