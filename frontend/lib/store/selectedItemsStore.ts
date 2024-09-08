import { create } from 'zustand'
import { SearchResult } from '@/lib/types'


interface SelectedItemsState {
  selectedItems: SearchResult[]
  setSelectedItems: React.Dispatch<React.SetStateAction<SearchResult[]>>
  addSelectedItem: (item: SearchResult) => void
  removeSelectedItem: (item: SearchResult) => void
}

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set((state) => ({
    selectedItems: typeof items === 'function' ? items(state.selectedItems) : items
  })),
  addSelectedItem: (item) => set((state) => ({
    selectedItems: [...state.selectedItems, item]
  })),
  removeSelectedItem: (item) => set((state) => ({
    selectedItems: state.selectedItems.filter((i) => i.link !== item.link)
  }))
}))