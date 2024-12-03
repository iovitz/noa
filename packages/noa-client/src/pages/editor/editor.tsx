import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const pageId = useParams().page
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
            width: '375px',
            background: '#fff',
          }}
        />
      </div>
      <div
        style={{
          width: '250px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '375px',
          }}
        />
      </div>
    </div>
  )
}
