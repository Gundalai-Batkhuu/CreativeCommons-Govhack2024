import { auth } from '@/auth'
import { DocumentViewerSidebar } from '@/components/sidebar/document-viewer-sidebar'
import { UserArtifactsList } from '@/components/sidebar/user-artifacts-list'

export async function DocumentViewerSidebarContainer() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  return (
    <DocumentViewerSidebar className="peer absolute inset-y-0 right-0 z-30 hidden translate-x-full border-l bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <UserArtifactsList userId={session.user.id} />
    </DocumentViewerSidebar>
  )
}