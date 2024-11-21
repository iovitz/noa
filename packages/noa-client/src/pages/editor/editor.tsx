import React, { useEffect, useRef } from 'react'

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
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
            height: '668px',
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
            height: '668px',
            width: '375px',
          }}
        />
      </div>
    </div>
  )
}
