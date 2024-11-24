import { CenterContainer } from '@/components/style/style'
import { Button, Col, Row } from 'antd'
import { FileList } from './file-list'

export default function Home() {
  return (
    <CenterContainer>
      <h3>新建文件</h3>
      <Row style={{ width: '100%' }} gutter={15}>
        <Col span={6}>
          <Button type="dashed" size="large" block>新建表单</Button>
        </Col>
        <Col span={6}>
          <Button type="dashed" size="large" block>新建H5</Button>
        </Col>
        <Col span={6}>
          <Button type="dashed" size="large" block>新建简历</Button>
        </Col>
        <Col span={6}>
          <Button type="dashed" size="large" block>模板中心</Button>
        </Col>
      </Row>
      <h3>文件列表</h3>
      <FileList />
    </CenterContainer>
  )
}
