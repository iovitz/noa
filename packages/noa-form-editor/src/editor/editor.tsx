import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { IOClient } from '../io'
import { useFormEditorStore } from '../store/editor.store'
import PageCanvas from './page-canvas/page-canvas'
import CompList from './widget-list'

interface FormEditorProps {
  fileId: string
  io: IOClient
  needWatch: boolean
}

export const FormEditor = observer((props: FormEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorStore = useFormEditorStore()

  useEffect(() => {
    editorStore.loadPage(props.fileId, props.io)
    return () => {
      editorStore.destroy()
    }
  }, [])

  return (
    <div style={{
      height: '100%',
      display: 'flex',
    }}
    >
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
          <CompList />
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
        {props.fileId}
      </div>
    </div>
  )
})
