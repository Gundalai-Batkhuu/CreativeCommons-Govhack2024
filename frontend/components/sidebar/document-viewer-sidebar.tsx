'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'

export interface DocumentViewerSidebarProps extends React.ComponentProps<'div'> {}

export function DocumentViewerSidebar({ className, children }: DocumentViewerSidebarProps) {
  const { isSidebarOpen, isLoading } = useSidebar()

  return (
    <div
      className={cn(
        className,
        'absolute inset-y-0 right-0 z-30 h-full flex-col dark:bg-zinc-950',
        isSidebarOpen && !isLoading ? 'translate-x-0' : 'translate-x-full',
        'transition-transform duration-300 ease-in-out lg:w-[250px] xl:w-[300px]'
      )}
    >
      <div
        className="flex flex-col h-full border-l bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl overflow-hidden">
        <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
          <div className="w-full max-w-md p-4 space-y-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}