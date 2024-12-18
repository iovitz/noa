import { useStore } from '@/hooks/store.hook'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CompList from './comp-list'
import PageCanvas from './page-canvas/page-canvas'

const Editor = observer(() => {
  const editorRef = useRef<HTMLDivElement>(null)
  const pageId = useParams().page as string
  const pageStore = useStore('page')

  useEffect(() => {
    pageStore.loadPage(pageId)
    console.error(pageId)
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
            width: '200px',
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
        f
      </div>
    </div>
  )
})

export default Editor
