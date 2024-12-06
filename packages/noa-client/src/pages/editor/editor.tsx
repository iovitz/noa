import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CompList from './comp-list'
import PageCanvas from './page-canvas/page-canvas'

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const pageId = useParams().page as string

  console.error(pageId)
  useEffect(() => {
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
}
