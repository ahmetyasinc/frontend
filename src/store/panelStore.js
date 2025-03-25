import { create } from "zustand";

// Bugünün tarihinden bir gün öncesini hesaplayan fonksiyon
const getDefaultEndDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // Bir gün önceye ayarla
    return date.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS" formatına getir
};

const usePanelStore = create((set, get) => ({  // ✅ get fonksiyonunu ekledik
    panelWidth: 6,
    setPanelWidth: (width) => set({ panelWidth: width }),

    newPanels: 0, // Yeni eklenecek panel sayısı
    setNewPanels: (count) => set({ newPanels: count }),

    // ✅ Mevcut newPanels değerine ekleme yapan fonksiyon
    increaseNewPanels: (count) => set((state) => ({ newPanels: state.newPanels + count })),

    end: getDefaultEndDate(), // Varsayılan olarak bir gün önce
    setEnd: (newEnd) => set({ end: newEnd }), // Yeni tarih belirleme fonksiyonu
}));

export default usePanelStore;
