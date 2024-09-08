import {auth} from "@/auth";
import {Session} from "@/lib/types";
import Analytics from "@/components/ui/analytics";


export default async function DiscussionPage() {
  const session = (await auth()) as Session

  return (
    <Analytics />
  )
}