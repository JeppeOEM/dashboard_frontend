import { create } from "zustand";

import Strategy from "../models/Strategy"; 
import { StrategiesClient } from "../services/ApiClientInstances";


interface StrategyStore {
strategies: Strategy[];
selectedStrategy: Strategy | null;
selectedId: number | null;
add: (name: string) => void;
remove: (strategyId: number) => void;
setStrategy: (strategyId: number) => void;
setStrategyId: (id: number) => void;
}


const strategyStore = create<StrategyStore>((set) => ({
    strategies: [],
    selectedStrategy: null,
    selectedId: null,

    setStrategyId: (id: number) => set(() => ({ selectedId: id })),

    add: async (name: string) => {
        try {
            const strategyName = { name };
            // Update the database with the new strategy
            StrategiesClient.post(strategyName).then(newStrategy => {
                set((state) => {
                    return {
                        strategies: [...state.strategies, newStrategy],
                    };
                });
            });
        } catch (error) {
            console.error('Error while adding item:', error);
        }
    },
    remove: (strategyId) => {
        try {
            // Remove the strategy from the database
            StrategiesClient.delete(strategyId).then(() => {
                set((state) => {
                    return {
                        strategies: state.strategies.filter((strategy) => strategy.id !== strategyId),
                    };
                });
            });
        } catch (error) {
            console.error('Error while removing item:', error);
        }
    },
    setStrategy: (strategyId) => {
        try {
                set((state) => {
                    return {
                        selectedStrategy: state.strategies.find((strategy) => strategy.id === strategyId),
                    };
                });
        } catch (error) {
            console.error('Error while setting strategy:', error);
        }
    },
    update: (strategyId: number, strategy: Strategy) => {
        try {
            StrategiesClient.update(strategyId, strategy).then(updatedStrategy => {
                set((state) => {
                    return {
                        strategies: state.strategies.map((strategy) => {
                            // checks if id is the same as the updated strategy
                            // and replaces the strategy if it is
                            return strategy.id === strategyId ? updatedStrategy : strategy;
                        }),
                    };
                });
            });
        } catch (error) {
            console.error('Error while updating strategy:', error);
        }
    }
}));

export default strategyStore;


