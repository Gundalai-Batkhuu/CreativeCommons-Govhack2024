import { create } from 'zustand'
import { userService } from '@/lib/services/user-service'
import { UserArtifactsResponse, Artefact } from '@/lib/types'

interface UserArtifactsState {
  artifacts: UserArtifactsResponse | null
  isLoading: boolean
  error: string | null
  selectedArtifactId: string | null
  fetchUserArtifacts: (userId: string) => Promise<void>
  addArtifact: (artifact: Artefact) => void
  removeArtifact: (artifactId: string) => void
  updateArtifact: (artifact: Artefact) => void
  setSelectedArtifactId: (artifactId: string | null) => void
}

export const useUserArtifactsStore = create<UserArtifactsState>((set) => ({
  artifacts: null,
  isLoading: false,
  error: null,
  selectedArtifactId: null,

  fetchUserArtifacts: async (userId: string) => {
    set({ isLoading: true, error: null })
    try {
      const data = await userService.getUserArtifacts(userId)
      set((state) => ({
        artifacts: data,
        isLoading: false,
        // Set the first artifact as selected by default if it exists
        selectedArtifactId: data.artefact_tree.length > 0 ? data.artefact_tree[0].document_id : null
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  addArtifact: (artifact: Artefact) => set((state) => ({
    artifacts: state.artifacts
      ? {
          ...state.artifacts,
          artefact_tree: [...state.artifacts.artefact_tree, artifact]
        }
      : null
  })),

  removeArtifact: (artifactId: string) => set((state) => ({
    artifacts: state.artifacts
      ? {
          ...state.artifacts,
          artefact_tree: state.artifacts.artefact_tree.filter((a) => a.document_id !== artifactId)
        }
      : null,
    // If the removed artifact was selected, clear the selection
    selectedArtifactId: state.selectedArtifactId === artifactId ? null : state.selectedArtifactId
  })),

  updateArtifact: (updatedArtifact: Artefact) => set((state) => ({
    artifacts: state.artifacts
      ? {
          ...state.artifacts,
          artefact_tree: state.artifacts.artefact_tree.map((a) =>
            a.document_id === updatedArtifact.document_id ? updatedArtifact : a
          )
        }
      : null
  })),

  setSelectedArtifactId: (artifactId: string | null) => set({ selectedArtifactId: artifactId })
}))