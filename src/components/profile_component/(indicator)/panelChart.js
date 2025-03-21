"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts"; // Hafif grafik çizimi için
import PropTypes from "prop-types";

// 🔹 Rastgele veri üreten fonksiyon
const generateRandomData = (endDate, numberOfDays, minValue = 10, maxValue = 100) => {
  let data = [];
  let currentDate = new Date(endDate);

  // Belirtilen gün sayısını geriye giderek başlangıç tarihini belirle
  currentDate.setDate(currentDate.getDate() - numberOfDays);

  for (let i = 0; i < numberOfDays; i++) {
    data.push({
      time: currentDate.toISOString().split("T")[0], // YYYY-MM-DD formatında tarih
      value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue, // Rastgele değer
    });

    // Bir sonraki güne geç
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export default function PanelChart({ data, indicatorType, options }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(generateRandomData("2025-03-10", 1000)); // Eğer veri yoksa rastgele veri üret

  useEffect(() => {
    if (!chartContainerRef.current || !chartData || chartData.length === 0) return;

    // 🔹 **Grafik oluştur**
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: "#111" },
        textColor: "#FFF",
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
      timeScale: {visible: false,},
      //handleScroll: false,
      //handleScale: false, // Kullanıcı tarafından gelen özel ayarları uygula
    });

    chartRef.current = chart;

    let series;
    switch (indicatorType) {
      case "RSI":
        series = chart.addLineSeries({ color: "purple", lineWidth: 2 });
        break;
      case "MACD":
        series = chart.addHistogramSeries({ color: "green" });
        break;
      case "Bollinger":
        series = chart.addAreaSeries({
          topColor: "rgba(33, 150, 243, 0.5)",
          bottomColor: "rgba(33, 150, 243, 0.1)",
          lineColor: "blue",
        });
        break;
      default:
        series = chart.addLineSeries({ color: "white", lineWidth: 2 });
    }

    series.setData(chartData);

    // 🔹 **Resize Observer ile grafik boyutunu güncelle**
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    // 🛑 **Cleanup: Bileşen unmount olduğunda işlemleri temizle**
    return () => {
      resizeObserver.disconnect();
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (error) {
          console.warn("Grafik temizlenirken hata oluştu:", error);
        }
      }
    };
  }, [chartData, indicatorType, options]);

  return (
    <div className="relative w-full h-full">
      <div ref={chartContainerRef} className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
}

PanelChart.propTypes = {
  data: PropTypes.array, // Eğer veri yoksa rastgele üretilecek
  indicatorType: PropTypes.string.isRequired, // Zorunlu indikatör türü
  options: PropTypes.object, // Opsiyonel ayarlar
};
