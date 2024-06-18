import { create } from "zustand";

import Strategy from "../models/Strategy"; 
import { pricesClient } from "../services/ApiClientInstances";


interface priceStore {
prices: Price[];
selectedCoinId: number | null;
setPrices: (prices: Strategy[]) => void;
setCoinId: (id: number) => void;
getById: () => Strategy | undefined;
}

const priceStore = create<priceStore>((set, get) => ({
    prices: [],
    selectedCoinId: null,
    setPrices: (prices: Strategy[]) => set(() => ({ prices })),
    setCoinId: (id: number) => set(() => ({ selectedCoinId: id })),
  
    getById: () => {
        const { prices, selectedCoinId } = get();
        console.log(`Selected ID: ${selectedCoinId}`);
        console.log(`prices: ${JSON.stringify(prices)}`);
        const foundStrategy = prices.find((strategy) => strategy.id === selectedCoinId);
        console.log(`Found strategy: ${JSON.stringify(foundStrategy)}`);
        return foundStrategy;
      },
  }));

export default priceStore;


