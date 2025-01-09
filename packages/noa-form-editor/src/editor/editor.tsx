import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import CompList from './component-list'
import PageCanvas from './page-canvas/page-canvas'

interface FormEditorProps {
  fileId: string
}

export const FormEditor = observer((props: FormEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    //
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
            width: '300px',
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
