import { EditorContainer, PageType } from 'noa-sdk'
import React, { useEffect, useRef } from 'react'

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = new EditorContainer({
      el: editorRef.current!,
      pageId: '123',
      pageType: PageType.Form,
    })
    container.render()
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
