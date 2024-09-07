'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Database, Settings, Pencil, Trash2, Share2, ChartNoAxesCombined } from "lucide-react"

interface KnowledgeBase {
  id: string
  name: string
}

const mockKnowledgeBases: KnowledgeBase[] = [
  { id: '1', name: 'Marketing Strategies' },
  { id: '2', name: 'Product Development' },
  { id: '3', name: 'Customer Support FAQs' },
  { id: '4', name: 'HR Policies' },
  { id: '5', name: 'Sales Techniques' },
]

export default function TwoPaneUI() {
  const [activeTab, setActiveTab] = useState('knowledge-bases')
  const [knowledgeBases, setKnowledgeBases] = useState(mockKnowledgeBases)
  const [showNotification, setShowNotification] = useState(false)

  const handleDelete = (id: string) => {
    setKnowledgeBases(knowledgeBases.filter(kb => kb.id !== id))
  }

  const onShare = (id: string) => {
    setShowNotification(true)
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    }, [showNotification])

  return (
    <div className="flex h-screen bg-gray-100 gap-1">
      {/* Left Pane */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <nav>
          <ul className="space-y-2">
            <li>
              <Button
                variant={activeTab === 'knowledge-bases' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('knowledge-bases')}
              >
                <Database className="mr-2 h-4 w-4" />
                Knowledge Bases
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <ChartNoAxesCombined className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Pane */}
      <div className="w-3/4 p-6 overflow-auto bg-white">
        <div className="py-4 flex items-center">
        <Database className="h-16 w-16 mr-4" />
            <h1 className="text-2xl font-bold">Knowledge Bases</h1>
            
        </div>
        
        <div className="grid gap-2">
          {knowledgeBases.map((kb) => (
            <Card key={kb.id} className="w-full transition-all duration-300 ease-in-out hover:scale-[1.02]">
              <CardContent className="flex items-center justify-between p-4 cursor-pointer">
                <span className="text-lg font-medium">{kb.name}</span>
                <div className="flex space-x-2">
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Update</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(kb.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onShare(kb.id)}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className={`fixed top-20 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>Added to the knowledge pool!</div>
    </div>
    
  )
}