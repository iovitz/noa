import { IOClient } from '@/io'
import { useFormEditorStore } from '@/store/editor/editor.store'
import { Spin, theme } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import PageCanvas from './page-canvas/page-canvas'
import PropsPanel from './props-panel/props-panel'
import WidgetList from './widget-list'

const { useToken } = theme
interface FormEditorProps {
  fileId: string
  io: IOClient
  needWatch: boolean
}

export const FormEditor = observer((props: FormEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const editorStore = useFormEditorStore()
  const { token } = useToken()

  useEffect(() => {
    editorStore.setIO(props.io)
    editorStore.loadPage(props.fileId).then(() => setTimeout(() => setLoading(false), 500))
    return () => {
      editorStore.destroy()
    }
  }, [])

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      position: 'relative',
    }}
    >
      {loading && (
        <div
          className="loading"
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: token.colorBgBase,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Spin />
          加载中...
        </div>
      )}
      <div>
        <div
          ref={editorRef}
          style={{
            height: '100%',
            width: '350px',
            background: '#fff',
            boxSizing: 'border-box',
            padding: '15px',
          }}
        >
          <WidgetList />
        </div>
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <PageCanvas />
      </div>
      <div
        style={{
          height: '100%',
          width: '375px',
        }}
      >
        <PropsPanel />
      </div>
    </div>
  )
})
