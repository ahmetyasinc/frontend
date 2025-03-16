"use client";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import StockChart from "@/components/profile_component/(indicator)/StockChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FlexibleGridLayout = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  
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
      { i: "chart", x: 0, y: 0, w: 8, h: 10, minW: 6, maxW: 12, minH: 5, maxH: 15, isDraggable: false },  
      { i: "b", x: 0, y: 9, w: 2, h: 5 },
      { i: "c", x: 4, y: 0, w: 2, h: 2 },
      { i: "d", x: 8, y: 8, w: 4, h: 6 },
      { i: "e", x: 10, y: 10, w: 2, h: 2 },
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
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={30}
            margin={[3, 3]}
            containerPadding={[8, 9]}
            isDraggable={true}
            isResizable={true}
            style={{ minHeight: "100vh", overflow: "visible" }} // Yeni ekleme
        >

          <div key="chart" className="relative w-full h-full m-0">
              <StockChart />
          </div>
          <div key="b" className="bg-green-400 text-white flex items-center justify-center rounded-[2px] shadow">
            Panel B
          </div>
          <div key="c" className="bg-red-400 text-white flex items-center justify-center rounded-[2px] shadow">
            Panel C
          </div>
          <div key="d" className="bg-purple-400 text-white flex items-center justify-center rounded-[2px] shadow">
            Panel D
          </div>
          <div key="e" className="bg-yellow-500 text-white flex items-center justify-center rounded-[2px] shadow">
            Panel E
          </div>
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default FlexibleGridLayout;