import type { TableProps } from 'antd'
import { ioClient, ServerData } from '@/shared/io/io'
import { useRequest } from 'ahooks'
import { Button, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'

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
  const [pages, setPages] = useState<PageResponse[]>([])
  const [total, setTotal] = useState(0)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { run, loading } = useRequest<ServerData<{
    total: number
    pages: PageResponse[]
  }>, []>(
    () => {
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
      onSuccess({ data: { pages, total } }) {
        pages.forEach(item => item.key = item.id)
        setPages(pages)
        setTotal(total)
      },
    },
  )

  useEffect(run, [page, pageSize])

  return (
    <Table<PageResponse>
      columns={columns}
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
