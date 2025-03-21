import { create } from "zustand";

const useIndicatorStore = create((set) => ({
    tecnic: [],
    community: [],
    indicators: [], // Kaydedilen indikatörler listesi
    favorites: [], // Favori indikatörler listesi
    isVisible: {}, // İndikatörlerin açık/kapalı durumlarını saklayan obje

    setCommunityIndicators: (newIndicators) => set(() => {
        const newFavorites = newIndicators.filter((indicator) => indicator.favorite);
        return {
            community: newIndicators,
            favorites: newFavorites, // Favorileri güncelle
        };
    }),

    setTecnicIndicators: (newIndicators) => set(() => {
        const newFavorites = newIndicators.filter((indicator) => indicator.favorite);
        return {
            tecnic: newIndicators,
            favorites: newFavorites, // Favorileri güncelle
        };
    }),

    setPersonalIndicators: (newIndicators) => set(() => {
        const newFavorites = newIndicators.filter((indicator) => indicator.favorite);
        console.log("store")
        console.log(newIndicators)
        return {
            indicators: newIndicators,
            favorites: newFavorites, // Favorileri güncelle
        };
    }),

    addIndicator: (indicator) => set((state) => ({
        indicators: [...state.indicators, indicator]
    })),

    deleteIndicator: (id) => set((state) => ({
        indicators: state.indicators.filter((indicator) => indicator.id !== id)
    })),

    toggleFavorite: (indicator) => set((state) => {
        const isAlreadyFavorite = state.favorites.some((fav) => fav.id === indicator.id);
        return {
            favorites: isAlreadyFavorite
                ? state.favorites.filter((fav) => fav.id !== indicator.id)
                : [...state.favorites, indicator]
        };
    }),

    toggleIndicator: (indicatorId) => set((state) => ({
        isVisible: {
            ...state.isVisible,
            [indicatorId]: !state.isVisible[indicatorId]
        }
    })),
}));

export default useIndicatorStore;
