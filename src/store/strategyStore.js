import { create } from "zustand";

const useStrategyStore = create((set) => ({
    strategies: [], // Kullanıcının stratejilerini saklayan liste
    favorites: [], // Favori stratejileri saklayan liste
    isVisible: {}, // Stratejilerin açık/kapalı durumlarını saklayan obje

    addStrategy: (strategy) => set((state) => ({
        strategies: [...state.strategies, strategy]
    })),

    deleteStrategy: (id) => set((state) => ({
        strategies: state.strategies.filter((strategy) => strategy.id !== id),
        favorites: state.favorites.filter((strategy) => strategy.id !== id),
        isVisible: Object.fromEntries(
            Object.entries(state.isVisible).filter(([key]) => key !== id)
        ) // Silinen stratejinin görünürlük durumunu da kaldır
    })),

    toggleFavorite: (strategy) => set((state) => {
        const isFavorite = state.favorites.some((fav) => fav.id === strategy.id);
        return {
            favorites: isFavorite
                ? state.favorites.filter((fav) => fav.id !== strategy.id)
                : [...state.favorites, strategy]
        };
    }),

    toggleStrategy: (strategyId) => set((state) => ({
        isVisible: {
            ...state.isVisible,
            [strategyId]: !state.isVisible[strategyId] // Strateji görünürlük durumunu değiştir
        }
    })),
}));

export default useStrategyStore;
