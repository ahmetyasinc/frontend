import { create } from "zustand";

const usePanelStore = create((set) => ({
  panelWidth: 8, // Varsayılan genişlik değeri
  setPanelWidth: (newWidth) => set({ panelWidth: newWidth }),
}));

export default usePanelStore;
