import { create } from "zustand"

interface CoinSearchQuery {
  genreId?: number
  platformId?: number
  sortOrder?: string
  searchText?: string
}

interface CoinQueryStore {
  coinQuery: CoinSearchQuery
  setSearchText: (searchText: string) => void
  setSortOrder: (sortOrder: string) => void
}



const coinQueryStore = create<CoinQueryStore>((set) => ({
  coinQuery: {},
  setSearchText: (searchText) => set(() => ({ coinQuery: { searchText } })), //when searching, we clear the other filters
  setSortOrder: (sortOrder) =>
    set((store) => ({ coinQuery: { ...store.coinQuery, sortOrder } })),
}))

export default coinQueryStore
