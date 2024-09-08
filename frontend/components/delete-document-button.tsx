import React from 'react'
import { documentService } from '@/lib/services/document-service'

interface DeleteDocumentButtonProps {
  documentId: number;
  onSuccess?: () => void;
}

export const DeleteDocumentButton = ({
  documentId,
  onSuccess
}: DeleteDocumentButtonProps) => {

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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