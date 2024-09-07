import React from 'react'
import { Button } from '@/components/ui/button'
import { documentService } from '@/lib/services/document-service'
import { KnowledgeBase } from '@/lib/types'


export const CreateDocumentButton = ({
  links,
  description
}: KnowledgeBase) => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const document: KnowledgeBase = {
        links: links,
        description: description
      }

      const result = await documentService.createDocumentSelection(
        document
      )
      console.log('Document creation successful:', result)

    } catch (error) {
      console.error('Error during document creation:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch">
      <Button variant="ghost" className="dark:bg-emerald-900 bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-800 ">
        Submit new document
      </Button>
    </form>
  )
}
