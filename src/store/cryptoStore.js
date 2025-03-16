import { create } from "zustand";

const useCryptoStore = create((set) => ({
    pinned: [], // Sabitlenen kriptolar
    selectedCrypto: "BTCUSDT", // Seçilen kripto para
    selectedPeriod: "4 saat", // Varsayılan zaman aralığı

    togglePinned: (crypto) => set((state) => {
        const isAlreadyPinned = state.pinned.includes(crypto);
        return {
            pinned: isAlreadyPinned
                ? state.pinned.filter((item) => item !== crypto) // Sabitleneni çıkar
                : [crypto, ...state.pinned], // Yeni sabitlenen en üste ekle
        };
    }),

    setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }), // Seçili kriptoyu güncelle
    setSelectedPeriod: (period) => set({ selectedPeriod: period }) // Seçili zamanı güncelle
}));

export default useCryptoStore;
