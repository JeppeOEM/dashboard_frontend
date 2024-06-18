import { create } from "zustand";

import { Price } from "../models/Price";


interface priceStore {
prices: Price[];
selectedCoinId: number | null;
setPrices: (prices: Price[]) => void;
setCoinId: (id: number) => void;
getByCoinId: () => Price | undefined;
}

const priceStore = create<priceStore>((set, get) => ({
    prices: [],
    selectedCoinId: null,
    setPrices: (prices: Price[]) => set(() => ({ prices })),
    setCoinId: (id: number) => set(() => ({ selectedCoinId: id })),
  
    getByCoinId: () => {
        const { prices, selectedCoinId } = get();
        console.log(`Selected ID: ${selectedCoinId}`);
        console.log(`prices: ${JSON.stringify(prices)}`);
        const foundStrategy = prices.find((strategy) => strategy.id === selectedCoinId);
        console.log(`Found strategy: ${JSON.stringify(foundStrategy)}`);
        return foundStrategy;
      },
  }));

export default priceStore;


