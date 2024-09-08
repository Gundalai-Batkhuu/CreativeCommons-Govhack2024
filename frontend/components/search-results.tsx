import React, { memo, useCallback } from 'react'
import { SearchResult } from '@/lib/types'

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength - 1) + '…'
}

interface SearchResultItemProps {
  result: SearchResult
  isSelected: boolean
  onToggle: (result: SearchResult) => void
}

const SearchResultItem = memo(({ result, isSelected, onToggle }: SearchResultItemProps) => {
  const handleToggle = useCallback(() => onToggle(result), [result, onToggle])

  return (
    <div className="mb-12 flex items-center justify-between">
      <div className="flex-grow pr-4">
        <div className="flex items-center mb-1">
          {result.thumbnail && (
            <img
              src={result.thumbnail}
              alt=""
              className="w-8 h-8 mr-2 rounded-full"
            />
          )}
          <div className="overflow-hidden">
            <a
              href={result.link}
              className="text-sm text-black dark:text-gray-300 hover:underline block whitespace-nowrap overflow-hidden text-overflow-ellipsis"
              title={result.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {truncateText(result.link, 80)}
            </a>
          </div>
        </div>
        <h3 className="text-xl mb-1">
          <a
            href={result.link}
            className="text-blue-700 dark:text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.title}
          </a>
        </h3>
        <p
          className="text-sm text-black dark:text-gray-200"
          dangerouslySetInnerHTML={{
            __html: result.html_snippet
          }}
        />
      </div>
      <div className="flex-shrink-0">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={isSelected}
            onChange={handleToggle}
          />
          <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
            {isSelected && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </label>
      </div>
    </div>
  )
})

SearchResultItem.displayName = 'SearchResultItem'


interface SearchResultsListProps {
  results: SearchResult[] | { [key: string]: any } | null | undefined
  selectedItems: SearchResult[]
  setSelectedItems: React.Dispatch<React.SetStateAction<SearchResult[]>>
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({ results, selectedItems, setSelectedItems }) => {
  const toggleItemSelection = useCallback((result: SearchResult) => {
    setSelectedItems(prev =>
      prev.includes(result)
        ? prev.filter(item => item !== result)
        : [...prev, result]
    )
  }, [setSelectedItems])

  if (results === null || results === undefined) {
    return <div className="max-w-2xl mx-auto mt-8">Loading results...</div>
  }

  let searchResults: SearchResult[] = []

  if (Array.isArray(results)) {
    searchResults = results
  } else if (typeof results === 'object') {
    console.log('Results object:', results)
    // Try to find an array in the object
    const possibleArrays = Object.values(results).filter(Array.isArray)
    if (possibleArrays.length > 0) {
      searchResults = possibleArrays[0] as SearchResult[]
      console.log('Found array in results object:', searchResults)
    } else {
      console.error('Could not find an array in the results object')
      return <div className="max-w-2xl mx-auto mt-8">Error: Invalid results format</div>
    }
  } else {
    console.error('Results is neither an array nor an object:', results)
    return <div className="max-w-2xl mx-auto mt-8">Error: Invalid results format</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {searchResults.map((result, index) => (
        <SearchResultItem
          key={result.link || index}
          result={result}
          isSelected={selectedItems.includes(result)}
          onToggle={toggleItemSelection}
        />
      ))}
    </div>
  )
}