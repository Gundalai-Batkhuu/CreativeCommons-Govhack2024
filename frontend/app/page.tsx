import React from 'react'
import SearchPageContent from '@/components/search-page-content'

export default async function SearchPage() {
  const userId = '1234'
  return (
    <SearchPageContent userId={userId} />
  )
}
