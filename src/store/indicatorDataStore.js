import { create } from "zustand";

const useIndicatorDataStore = create((set) => ({
    indicatorData: {}, // Her indikatörün verisini burada saklayacağız

    // Yeni indikatör verisini ekleme veya güncelleme fonksiyonu
    setIndicatorData: (indicatorId, result, prints) =>
        set((state) => ({
            indicatorData: {
                ...state.indicatorData,
                [indicatorId]: {
                    indicator_result: result, // API'den gelen `indicator_result` verisi
                    prints: prints, // API'den gelen `prints` verisi
                },
            },
        })),
    
    clearIndicatorData: (id) =>
        set((state) => {
            const newData = { ...state.indicatorData };
            delete newData[id];
            return { indicatorData: newData };
        }),
        
}));

export default useIndicatorDataStore;
