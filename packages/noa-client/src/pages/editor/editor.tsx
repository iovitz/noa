import React, { useEffect, useRef } from 'react'

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
  }, [])
  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-center justify-center">
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
        className="bg-gray-50"
        style={{
          width: '250px',
        }}
      >
        <div
          className="bg-light-50"
          style={{
            height: '668px',
            width: '375px',
          }}
        />
      </div>
    </div>
  )
}
