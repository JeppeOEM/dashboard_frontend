import { create } from "zustand";

interface CoinSearchQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface CoinQueryStore {
  coinQuery: CoinSearchQuery;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
}



const CoinQueryStore = create<GameQueryStore>((set) => ({
  coinQuery: {},
  setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })), //when searching, we clear the other filters
  setSortOrder: (sortOrder) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
}));

export default CoinGameQueryStore;
