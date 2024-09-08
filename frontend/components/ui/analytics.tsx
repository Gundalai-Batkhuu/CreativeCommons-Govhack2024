'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Database, Settings, ChartNoAxesCombined } from "lucide-react"
import StatsCard from '../stat-card'
import FactCard from '../fact_card'
import { UsersRound, Headset} from "lucide-react"
import WordCloud from '../wordcloud'
import CallsLineGraph from '../line-graph'
import {useRouter} from "next/navigation"

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNotification, setShowNotification] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    }, [showNotification])
  
    const showAnalyticsPage = () => {
      router.push(`/analytics`)
      setActiveTab('analytics')
    }
  
    const showAccountPage = () => {
      router.push(`/account`)
      setActiveTab('knowledge-bases')
    }

  return (
    <div className="flex bg-gray-100 gap-1">
      {/* Left Pane */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <nav>
          <ul className="space-y-2">
            <li>
              <Button
                variant={activeTab === 'knowledge-bases' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={showAccountPage}
              >
                <Database className="mr-2 h-4 w-4" />
                  Knowledge Bases
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={showAnalyticsPage}
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
            <ChartNoAxesCombined className="h-16 w-16 mr-4 text-primaryAccent" />
            <h1 className="text-2xl font-bold text-secondaryAccent">Statistics</h1>  
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