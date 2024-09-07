import {auth} from "@/auth";
import {Session} from "@/lib/types";
import DatabaseCollectionPageContent from "@/components/database-collection-page-content";


export default async function MarketPage() {
  const session = (await auth()) as Session

  return (
    <DatabaseCollectionPageContent />
  )
}