import {auth} from "@/auth";
import {Session} from "@/lib/types";
import TwoPaneUI from "@/components/account";


export default async function DiscussionPage() {
  const session = (await auth()) as Session

  return (
    <TwoPaneUI />
  )
}