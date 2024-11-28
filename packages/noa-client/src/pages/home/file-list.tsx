import type { TableProps } from 'antd'
import { useLogger } from '@/hooks/logger.hook'
import { ioClient, ServerData } from '@/shared/io/io'
import { useRequest } from 'ahooks'
import { Button, Space, Table } from 'antd'
import React, { useState } from 'react'

interface PageResponse {
  id: string
  key: string
  name: string
  description: string | null
  template: boolean
  shared: boolean
}

const columns: TableProps<PageResponse>['columns'] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
    render: text => <a>{text}</a>,
  },
  {
    title: '描述',
    dataIndex: 'description',
    render: (_, record) => record.description ? <p>{record.description}</p> : <p>暂无描述</p>,
  },
  {
    title: '标签',
    width: 200,
    render: (_, record) => (
      <Space size="middle">
        {
          record.shared ? <Button type="link">已分享</Button> : <Button type="primary">分享</Button>
        }
        <Button color="danger" variant="solid">
          删除
        </Button>
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
    pages: PageResponse[]
  }>, []>(
    () => {
      logger.debug('拉取数据', {
        page,
        pageSize,
      })
      return ioClient.request({
        method: 'get',
        url: '/page',
        params: {
          page,
          size: pageSize,
        },
      })
    },
    {
      refreshDeps: [page, pageSize],
      onSuccess({ data: { pages, total } }) {
        logger.debug('获取当前页面数据成功', pages)
        logger.debug('数据总条数', total)
        pages.forEach(item => item.key = item.id)
        setPages(pages)
        setTotal(total)
      },
    },
  )

  // useEffect(run, [page, pageSize])

  return (
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
    />
  )
}
