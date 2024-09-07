'use client'

import { TextEditor } from '@/components/text-editor'
import { useState } from 'react'

interface TextEditorPageContentProps {
  userId: string
}

export default function TextEditorPageContent({
  userId
}: TextEditorPageContentProps) {
  const [content, setContent] = useState('<p>Initial content</p>')

  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(spacing.16))]">
      <h1 className="text-2xl font-bold text-center py-4">Edit the document</h1>
      <div className="flex flex-col md:flex-row gap-4 p-4 h-[calc(100%_-_4rem)]">
        <div className="flex-1 min-w-0 overflow-auto">
          <div
            className="h-full border rounded p-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="w-1/2 min-w-0">
          <TextEditor
            value={content}
            onChange={setContent}
            className="size-full border rounded"
          />
        </div>
      </div>
    </div>
  )
}