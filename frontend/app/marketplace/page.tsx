import {auth} from "@/auth";
import {Session} from "@/lib/types";
import MarketPageContent from "@/components/market-page-content";


export default async function MarketPage() {
  const session = (await auth()) as Session

  return (
    <MarketPageContent />
  )
}