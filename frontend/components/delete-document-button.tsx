import React from 'react'
import { documentService } from '@/lib/services/document-service'
import { DeleteDocument } from '@/lib/types'

interface DeleteDocumentButtonProps extends DeleteDocument {
  onSuccess?: () => void
}

export const DeleteDocumentButton = ({
  user_id,
  document_id,
  onSuccess
}: DeleteDocumentButtonProps) => {

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const document: DeleteDocument = {
        user_id: user_id,
        document_id: document_id
      }

      const result = await documentService.deleteDocument(document)
      console.log('Document deletion successful:', result)

      if (onSuccess) {
        onSuccess()
      }

    } catch (error) {
      console.error('Error during document deletion:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="text-muted-foreground hover:text-foreground"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd" />
      </svg>
    </button>
  )
}