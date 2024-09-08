import {auth} from "@/auth";
import {Session} from "@/lib/types";
import Discussion from "@/components/discussion";


export default async function DiscussionPage() {
  const session = (await auth()) as Session

  return (
    <Discussion />
  )
}