'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Database, Settings, Pencil, Trash2, Share2, ChartNoAxesCombined } from "lucide-react"
import StatsCard from '../stat-card'
import FactCard from '../fact_card'
import { UsersRound, Headset} from "lucide-react"
import WordCloud from '../wordcloud'
import CallsLineGraph from '../line-graph'

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

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('dashboard')
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
            <ChartNoAxesCombined className="h-16 w-16 mr-4" />
            <h1 className="text-2xl font-bold">Statistics</h1>  
        </div>
        
        <div className="">
            <div className="flex justify-center mb-1">
                <StatsCard />
                <FactCard figure="190K" baseText="Individual Assisted" title="Service Count" icon={UsersRound}/>
                <FactCard figure="220" baseText="Hours of Conversation" title="Engage Time" icon={Headset}/>
            </div>
            <div className="flex justify-center">
                <WordCloud />
                <CallsLineGraph />
            </div>
        </div>
      </div>
    </div>
    
  )
}