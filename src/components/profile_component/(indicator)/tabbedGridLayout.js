"use client";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import StockChart from "@/components/profile_component/(indicator)/StockChart";
import PanelChart from "./panelChart";
import usePanelStore from "@/store/panelStore"; // Zustand store'u ekle

const ResponsiveGridLayout = WidthProvider(Responsive);

const FlexibleGridLayout = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const { panelWidth, setPanelWidth } = usePanelStore();
  
  useEffect(() => {
    // İlk render sırasında pencere genişliğini ayarla
    setWindowWidth(window.innerWidth);
    
    // Pencere boyutu değiştiğinde genişliği güncelle
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Farklı ekran boyutları için grid düzenleri
  const layouts = {
    lg: [
      { i: "chart", x: 0, y: 0, w: panelWidth, h: 11, minW: 6, maxW: 12, minH: 5, maxH: 19, isDraggable: false },  
      { i: "b", x: 0, y: 11, w: panelWidth, h: 4, minW: 6, maxW: 12, minH: 3, maxH: 15, isDraggable: false },
      { i: "c", x: 0, y: 14, w: panelWidth, h: 4, minW: 6, maxW: 12, minH: 3, maxH: 15, isDraggable: false },
      { i: "d", x: 0, y: 17, w: panelWidth, h: 4, minW: 6, maxW: 12, minH: 3, maxH: 15, isDraggable: false },
      { i: "e", x: 10, y: 10, w: 4, h: 4 },
      { i: "f", x: 10, y: 10, w: 3, h: 5 },
    ],
  };

  // Ekran boyutlarına göre col sayısını ayarla
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };
  const cols = { lg: 12, md: 12, sm: 6, xs: 4 };

  return (
    <div className="p-0 w-full min-h-screen">
      {windowWidth > 0 && (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
        rowHeight={30}
        margin={[3, 3]}
        containerPadding={[8, 9]}
        isDraggable={true}
        isResizable={true}
        onResizeStop={(layout, oldItem, newItem) => {
          if (["chart", "b", "c", "d"].includes(newItem.i)) {
            setPanelWidth(newItem.w); // **Tüm panellerin genişliğini eşitle**
          }
        }}
        style={{ minHeight: "100vh", overflow: "visible" }}
      >
        <div key="chart" className="relative w-full h-full m-0">
          <StockChart />
        </div>
        <div key="b" className="relative w-full h-full m-0">
          <PanelChart indicatorType="RSI" />
        </div>
        <div key="c" className="relative w-full h-full m-0">
          <PanelChart indicatorType="MACD" />
        </div>
        <div key="d" className="relative w-full h-full m-0">
          <PanelChart indicatorType="Bollinger" />
        </div>
          <div key="e" className="bg-[rgb(29,112,18)] text-white flex items-center justify-center rounded-[2px] shadow">
            Panel E
          </div>
          <div key="f" className="bg-[rgb(165,24,24)] text-white flex items-center justify-center rounded-[2px] shadow">
            Panel F
          </div>
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default FlexibleGridLayout;