import React, { useState } from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { CreateDocumentButton } from '@/components/create-document-button'
import { useSelectedItemsStore } from '@/lib/store/selectedItemsStore'
import { TextInputWithClearAndVoice } from '@/components/ui/text-input-with-clear-and-voice'

export interface SidebarProps extends React.ComponentProps<'div'> {
  userId: string
}

export function SidebarSelectedDocuments({ className, userId }: SidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar()
  const { selectedItems, removeSelectedItem } = useSelectedItemsStore()
  const selectedLinks = selectedItems.map(item => item.link)
  const [docAlias, setDocAlias] = useState('')
  const [docDescription, setDocDescription] = useState('')

  return (
    <div
      className={cn(
        className,
        'h-full flex-col dark:bg-zinc-950',
        isSidebarOpen && !isLoading ? 'translate-x-0' : 'translate-x-full',
        'transition-transform duration-300 ease-in-out'
      )}
    >
      <div className="flex flex-col h-full inset-y-0 border-l lg:w-[250px] xl:w-[300px] bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl overflow-hidden">
        <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
          <div className="w-full max-w-md p-4 space-y-5">
            {selectedItems.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-center items-center">
                  <p className="text-center dark:text-white">
                    {selectedItems.length} item
                    {selectedItems.length > 1 ? 's' : ''} selected
                  </p>
                </div>
                <ul className="space-y-4">
                  {selectedItems.map((item, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 dark:bg-white/10 p-3 rounded flex justify-between items-start"
                    >
                      <div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">
                          {item.title}
                        </div>
                        <div className="text-sm dark:text-gray-300 break-all mt-1">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {item.link}
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSelectedItem(item)}
                        className="text-gray-400 hover:text-black dark:hover:text-white transition-colors w-6 h-6 flex items-center justify-center"
                        aria-label="Remove item"
                      >
                        &#10005;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {selectedItems.length > 0 && (
            <div className="p-4 flex flex-col items-center space-y-4">
              <div className="w-full space-y-4">
                <TextInputWithClearAndVoice
                  placeholder="Enter title... (optional)"
                  onChange={setDocAlias}
                />
                <TextInputWithClearAndVoice
                  placeholder="Enter description... (optional)"
                  onChange={setDocDescription}
                />
              </div>
              <CreateDocumentButton
                links={selectedLinks}
                description={docDescription}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
