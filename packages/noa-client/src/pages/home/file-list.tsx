import type { TableProps } from 'antd'
import { useLogger } from '@/hooks/logger.hook'
import { ioClient, ServerData } from '@/shared/io/io'
import { useRequest } from 'ahooks'
import { Button, Empty, Popconfirm, Rate, Space, Switch, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface PageResponse {
  id: string
  name: string
  description: string | null
  template: boolean
  shared: boolean
}

const columns: TableProps<PageResponse>['columns'] = [
  {
    title: '收藏',
    dataIndex: 'name',
    width: 50,
    render: like => <Rate count={1} value={like ? 0 : 1} />,
  },
  {
    title: '名称',
    width: 200,
    render(_, data) {
      return <Link to={`/form-editor/${data.id}`}>{data.name}</Link>
    },
  },
  {
    title: '页面类型',
    dataIndex: 'type',
    width: 100,
    render: type => (
      <>
        <Tag>{type}</Tag>
      </>
    ),
  },
  {
    title: '描述',
    dataIndex: 'description',
    render: description => description ? <p>{description}</p> : <p>暂无描述</p>,
  },
  {
    title: '开启分享',
    dataIndex: 'description',
    width: 100,
    render: () => <Switch defaultChecked onChange={() => {}} />,
  },
  {
    title: '操作',
    width: 250,
    render: (_, record) => (
      <Space size="middle">
        <Button color="default">
          统计
        </Button>
        {
          record.shared ? <Button type="link">已分享</Button> : <Button type="primary">分享</Button>
        }

        <Popconfirm
          title="删除表单"
          description="确认要删除表单？"
          onConfirm={() => {
            console.error('删除')
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button color="danger" variant="solid">
            删除
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export const FileList: React.FC = () => {
  const logger = useLogger('file-table')
  const [pages, setPages] = useState<PageResponse[]>([])
  const [total, setTotal] = useState(0)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { loading } = useRequest<ServerData<{
    total: number
    files: PageResponse[]
  }>, []>(
    () => {
      logger.debug('拉取数据', {
        page,
        pageSize,
      })
      return ioClient.request({
        method: 'get',
        url: '/space/file-list',
        params: {
          page,
          size: pageSize,
        },
      })
    },
    {
      refreshDeps: [page, pageSize],
      onSuccess({ data: { files, total } }) {
        logger.debug('获取当前页面数据成功', files)
        logger.debug('数据总条数', total)
        setPages(files)
        setTotal(total)
      },
    },
  )

  // useEffect(run, [page, pageSize])

  return (
    pages.length || loading
      ? (
          <Table<PageResponse>
            columns={columns}
            size="small"
            dataSource={pages}
            loading={loading}
            pagination={{
              pageSize,
              total,
              onChange(page, pageSize) {
                setPage(page)
                setPageSize(pageSize)
              },
            }}
            rowKey={({ id }) => id}
          />
        )
      : <Empty />
  )
}
