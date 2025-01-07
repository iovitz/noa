import { usePageStore } from '@/store/page/page.store'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CompList from './comp-list'
import PageCanvas from './page-canvas/page-canvas'
import { formEditorStore } from './store/editor.store'

const FormEditor = observer(() => {
  const editorRef = useRef<HTMLDivElement>(null)
  const pageId = useParams().page as string
  const pageStore = usePageStore()

  useEffect(() => {
    pageStore.loadPage(pageId)
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
        {formEditorStore.name}
        <button onClick={() => formEditorStore.changeName()}>保存</button>
      </div>
    </div>
  )
})

export default FormEditor
