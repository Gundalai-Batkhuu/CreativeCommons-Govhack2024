import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Artifact } from '@/lib/types'
import { DeleteDocumentButton } from '@/components/delete-document-button'

interface UserArtifactProps {
  artifact: Artifact
  isExpanded: boolean
  isSelected: boolean
  onToggleExpand: () => void
  onSelect: () => void
  onDelete: () => void
}

const truncateString = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str
}

export function UserArtifact({
  artifact,
  isExpanded,
  isSelected,
  onToggleExpand,
  onSelect,
  onDelete
}: UserArtifactProps) {
  return (
    <div
      className={`cursor-pointer ${
        isSelected ? 'bg-gray-300 dark:bg-accent-dark' : 'bg-background dark:bg-background-dark'
      } border border-border dark:border-border-dark p-2 rounded transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between space-x-2 text-sm">
        <div className="flex items-center space-x-2 flex-grow">
          <button onClick={onToggleExpand} className="p-1 flex-shrink-0 text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-accent-dark rounded">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
          <div
            className={`cursor-pointer ${
              isSelected ? 'font-bold' : ''
            } truncate text-foreground dark:text-foreground-dark hover:text-accent-foreground dark:hover:text-accent-foreground-dark`}
            onClick={onSelect}
            title={artifact.title}
          >
            {truncateString(artifact.title, 20)}
          </div>
        </div>
        <DeleteDocumentButton
          documentId={artifact.id}
          onSuccess={onDelete}
        />
      </div>
      {isExpanded && (
        <div className="ml-6 mt-2 text-sm text-foreground dark:text-foreground-dark">
          <p><span className="font-bold">Title:</span> {artifact.title}</p>
          <p><span className="font-bold">Description:</span> {artifact.description}</p>
          <p><span className="font-bold">Category:</span> {artifact.category}</p>
          <p><span className="font-bold">Engagement:</span> {artifact.engagement}</p>
          <p><span className="font-bold">Featured:</span> {artifact.featured ? 'Yes' : 'No'}</p>
          <p><span className="font-bold">Resources:</span> {artifact.resources.length}</p>
        </div>
      )}
    </div>
  )
}