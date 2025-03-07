"use client"
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const ChartComponent = () => {
  const priceChartRef = useRef(null);
  const rsiChartRef = useRef(null);
  let priceChart = null;
  let rsiChart = null;

  useEffect(() => {
    if (!priceChartRef.current || !rsiChartRef.current) return;

    // 🔹 Üstteki ana fiyat grafiği (Mum + Çizgi)
    priceChart = createChart(priceChartRef.current, {
      width: 600,
      height: 300,
      layout: { background: { color: "#ffffff" }, textColor: "#000" },
      grid: { vertLines: { color: "#e1ecf2" }, horzLines: { color: "#e1ecf2" } }
    });

    const candlestickSeries = priceChart.addCandlestickSeries();
    candlestickSeries.setData([
      { time: "2024-01-01", open: 120, high: 105, low: 98, close: 102 },
      { time: "2024-01-02", open: 102, high: 108, low: 100, close: 106 },
      { time: "2024-01-03", open: 106, high: 130, low: 104, close: 109 },
      { time: "2024-01-04", open: 109, high: 115, low: 107, close: 112 },
      { time: "2024-01-05", open: 132, high: 118, low: 150, close: 115 },
      { time: "2024-01-06", open: 155, high: 120, low: 112, close: 118 },
      { time: "2024-01-07", open: 118, high: 125, low: 116, close: 132 },
      { time: "2024-01-08", open: 122, high: 128, low: 120, close: 126 },
      { time: "2024-01-09", open: 146, high: 132, low: 124, close: 130 },
      { time: "2024-01-10", open: 130, high: 136, low: 128, close: 144 },
      { time: "2024-01-11", open: 124, high: 140, low: 132, close: 138 },
      { time: "2024-01-12", open: 138, high: 105, low: 136, close: 142 },
      { time: "2024-02-01", open: 120, high: 105, low: 98, close: 102 },
      { time: "2024-02-02", open: 102, high: 108, low: 100, close: 106 },
      { time: "2024-02-03", open: 106, high: 130, low: 104, close: 109 },
      { time: "2024-02-04", open: 109, high: 115, low: 107, close: 112 },
      { time: "2024-02-05", open: 132, high: 118, low: 150, close: 115 },
      { time: "2024-02-06", open: 155, high: 120, low: 112, close: 118 },
      { time: "2024-02-07", open: 118, high: 125, low: 116, close: 132 },
      { time: "2024-02-08", open: 122, high: 128, low: 120, close: 126 },
      { time: "2024-02-09", open: 146, high: 132, low: 124, close: 130 },
      { time: "2024-02-10", open: 130, high: 136, low: 128, close: 144 },
      { time: "2024-02-11", open: 124, high: 140, low: 132, close: 138 },
      { time: "2024-02-12", open: 138, high: 105, low: 136, close: 142 },
    ]);

    // 🔹 Alt RSI benzeri grafik
    rsiChart = createChart(rsiChartRef.current, {
      width: 600,
      height: 150,
      layout: { background: { color: "#ffffff" }, textColor: "#000" },
      grid: { vertLines: { color: "#e1ecf2" }, horzLines: { color: "#e1ecf2" } }
    });

    const rsiSeries = rsiChart.addLineSeries({
      color: 'purple',
      lineWidth: 2,
    });

    rsiSeries.setData([
      { time: "2024-01-01", value: 45 },
      { time: "2024-01-02", value: 50 },
      { time: "2024-01-03", value: 52 },
      { time: "2024-01-04", value: 48 },
      { time: "2024-01-05", value: 55 },
      { time: "2024-01-06", value: 57 },
      { time: "2024-01-07", value: 53 },
      { time: "2024-01-08", value: 60 },
      { time: "2024-01-09", value: 58 },
      { time: "2024-01-10", value: 62 },
      { time: "2024-01-11", value: 59 },
      { time: "2024-01-12", value: 65 },
    ]);

    // 🔥 **Senkronizasyon Mekanizması**
    const syncCharts = (sourceChart, targetChart) => {
      sourceChart.timeScale().subscribeVisibleTimeRangeChange((newRange) => {
        targetChart.timeScale().setVisibleRange(newRange);
      });
    };

    syncCharts(priceChart, rsiChart);
    syncCharts(rsiChart, priceChart);

    return () => {
      priceChart.remove();
      rsiChart.remove();
    };
  }, []);

  return (
    <div>
      <div ref={priceChartRef} />
      <div ref={rsiChartRef} style={{ marginTop: "10px" }} />
    </div>
  );
};

export default ChartComponent;
