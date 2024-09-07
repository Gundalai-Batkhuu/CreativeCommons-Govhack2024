import React from 'react'
import { Button } from '@/components/ui/button'
import { documentService } from '@/lib/services/document-service'
import { CreateDocument } from '@/lib/types'


export const CreateDocumentButton = ({
  user_id,
  links,
  document_alias,
  description
}: CreateDocument) => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const document: CreateDocument = {
        user_id: user_id,
        links: links,
        document_alias: document_alias,
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
      <Button variant="ghost" className="bg-emerald-900 hover:bg-emerald-800">
        Submit new document
      </Button>
    </form>
  )
}
