import React from 'react'
import { SidebarChatHistory } from '@/components/sidebar/sidebar-chat-history'
import { DocumentViewerSidebarContainer } from '@/components/sidebar/document-viewer-sidebar-container'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <SidebarChatHistory />
      <main className="flex-1 overflow-hidden">{children}</main>
      <DocumentViewerSidebarContainer />
    </div>
  )
}