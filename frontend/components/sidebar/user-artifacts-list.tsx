"use client"

import * as React from 'react'
import { useUserArtifactsStore } from '@/lib/store/userArtifactsStore'
import { Artifact } from '@/lib/types'
import { useEffect, useState, useCallback } from 'react'
import { UserArtifact } from '@/components/user-artifact'

export function UserArtifactsList() {
  const { artifacts, isLoading, error, fetchArtifacts, selectedArtifactId, setSelectedArtifactId } = useUserArtifactsStore()
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const refreshArtifacts = useCallback(() => {
    fetchArtifacts()
  }, [fetchArtifacts])

  useEffect(() => {
    refreshArtifacts()
  }, [refreshArtifacts])

  useEffect(() => {
    if (artifacts && artifacts.length > 0) {
      const firstArtifactId = artifacts[0].id
      setExpandedId(firstArtifactId)
      setSelectedArtifactId(firstArtifactId)
    }
  }, [artifacts, setSelectedArtifactId])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!artifacts || artifacts.length === 0) return <div>No artifacts found.</div>

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleSelect = (id: number) => {
    setSelectedArtifactId(id === selectedArtifactId ? null : id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4">
        <h4 className="text-sm font-medium">Document store</h4>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="space-y-2">
          {artifacts.map((artifact: Artifact) => (
            <UserArtifact
              key={artifact.id}
              artifact={artifact}
              isExpanded={expandedId === artifact.id}
              isSelected={selectedArtifactId === artifact.id}
              onToggleExpand={() => toggleExpand(artifact.id)}
              onSelect={() => handleSelect(artifact.id)}
              onDelete={refreshArtifacts}
            />
          ))}
        </div>
      </div>
    </div>
  )
}