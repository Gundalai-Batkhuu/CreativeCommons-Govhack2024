import {auth} from "@/auth";
import {Session} from "@/lib/types";
import DiscussionList from "@/components/discussion-list";


export default async function DiscussionForumPage() {
  const session = (await auth()) as Session

  return (
    <DiscussionList />
  )
}