"use client";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import StockChart from "@/components/profile_component/(indicator)/StockChart";
import PanelChart from "./panelChart";
import usePanelStore from "@/store/panelStore";
import useIndicatorDataStore from "@/store/indicatorDataStore";

const ResponsiveGridLayout = WidthProvider(Responsive);

const FlexibleGridLayout = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const { panelWidth, setPanelWidth } = usePanelStore();
  const { indicatorData } = useIndicatorDataStore();

  // ✅ Yalnızca on_graph: false olan indicatorId'leri filtrele
  const filteredIndicatorIds = Object.entries(indicatorData)
    .filter(([_, info]) =>
      info.indicator_result?.some((res) => res.on_graph === false)
    )
    .map(([id]) => id);

  // ✅ İlk yüklemede ve pencere boyutu değiştiğinde windowWidth güncelle
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Grid layout'u dinamik oluştur
  const generateLayouts = () => {
    const layouts = { lg: [] };

    // Ana grafik paneli
    layouts.lg.push({
      i: "chart",
      x: 0,
      y: 0,
      w: panelWidth,
      h: 11,
      minW: 6,
      maxW: 12,
      minH: 5,
      maxH: 19,
      isDraggable: false,
    });

    // Ek paneller (indicatorId'ye göre)
    filteredIndicatorIds.forEach((id, index) => {
      layouts.lg.push({
        i: `panel-${id}`,
        x: 0,
        y: 11 + index * 4,
        w: panelWidth,
        h: 4,
        minW: 6,
        maxW: 12,
        minH: 3,
        maxH: 15,
        isDraggable: false,
      });
    });

    return layouts;
  };

  return (
    <div className="p-0 w-full min-h-screen">
      {windowWidth > 0 && (
        <ResponsiveGridLayout
          className="layout"
          layouts={generateLayouts()}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
          rowHeight={30}
          margin={[3, 3]}
          containerPadding={[8, 9]}
          isDraggable={true}
          isResizable={true}
          onResizeStop={(layout, oldItem, newItem) => {
            if (newItem.i.startsWith("panel")) {
              setPanelWidth(newItem.w);
            }
          }}
          style={{ minHeight: "100vh", overflow: "visible" }}
        >
          {/* Ana grafik */}
          <div key="chart" className="relative w-full h-full m-0">
            <StockChart />
          </div>

          {/* Sadece on_graph: false olan indikatör panelleri */}
          {filteredIndicatorIds.map((id) => (
            <div key={`panel-${id}`} className="relative w-full h-full m-0">
              <PanelChart indicatorId={id} />
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default FlexibleGridLayout;
