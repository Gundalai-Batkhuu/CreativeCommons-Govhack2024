import React from 'react'
import SearchPageContent from '@/components/search-page-content'
import { auth } from '@/auth'
import { Session } from '@/lib/types'

export default async function SearchPage() {
  const session = (await auth()) as Session
  const userId = session.user.id

  return (
    <SearchPageContent userId={userId} />
  )
}
