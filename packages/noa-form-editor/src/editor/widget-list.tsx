import { useFormEditorStore } from '@/store/editor/editor.store'
import { WidgetTypes } from '@/widgets'
import { Button, Col, Row, Space, Typography } from 'antd'
import React from 'react'
import { MdAttachFile, MdCheck, MdDateRange, MdFormatColorText, MdGpsFixed, MdInfoOutline, MdInsertChartOutlined, MdLocalPhone, MdMoney, MdNumbers, MdOutlineCheckBox, MdOutlineCheckCircle, MdOutlineHorizontalRule, MdOutlineImage, MdOutlineInput, MdOutlinePercent, MdOutlineStarOutline, MdOutlineTextFields, MdOutlineTitle, MdOutlineVideocam } from 'react-icons/md'

const { Title } = Typography

export default function WidgetList() {
  const store = useFormEditorStore()

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
          <Button
            type="dashed"
            icon={<MdOutlineTitle />}
            block
            onClick={() => store.addWidget<WidgetTypes.Title>({
              type: WidgetTypes.Title,
              title: '',
              titleLevel: 5,
            })}
            size="large"
          >
            标题
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineTextFields />}
            block
            onClick={() => store.addWidget<WidgetTypes.Text>({
              type: WidgetTypes.Text,
              text: '',
            })}
            size="large"
          >
            文字
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdFormatColorText />}
            block
            onClick={() => store.addWidget({
              type: WidgetTypes.Input,
            })}
            size="large"
          >
            富文本
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineVideocam />}
            block
            onClick={() => store.addWidget({
              type: WidgetTypes.Video,
            })}
            size="large"
          >
            视频
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineImage />}
            block
            onClick={() => store.addWidget<WidgetTypes.Image>({
              type: WidgetTypes.Image,
              name: '',
              imageUrl: '',
              banner: false,
            })}
            size="large"
          >
            图片
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineHorizontalRule />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            横线
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdInfoOutline />}
            block
            onClick={() => store.addWidget<WidgetTypes.Notification>({
              type: WidgetTypes.Notification,
              text: '',
              title: '',
              noticeType: 'info',
            })}
            size="large"
          >
            提示
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdInsertChartOutlined />}
            block
            onClick={() => store.addWidget({
              type: WidgetTypes.Video,
            })}
            size="large"
          >
            图表
          </Button>
        </Col>
      </Row>

      <Title level={4} style={{ textAlign: 'center' }}>表单组件</Title>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineInput />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            输入
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdNumbers />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            数字
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdLocalPhone />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            号码
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdMoney />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            金额
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlinePercent />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            进度
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineCheckCircle />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            单选
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineCheckBox />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            多选
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdCheck />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            复选
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdDateRange />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            时间
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdOutlineStarOutline />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            星级
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdGpsFixed />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            位置
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="dashed"
            icon={<MdAttachFile />}
            block
            onClick={() => store.addWidget({

              type: WidgetTypes.Video,
            })}
            size="large"
          >
            附件
          </Button>
        </Col>
      </Row>
    </Space>
  )
}
