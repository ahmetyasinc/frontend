/*"use client";
import { CrosshairMode } from "lightweight-charts"; // 📌 CrosshairMode ekle
import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function ChartComponent() {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8000/api/get-binance-data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        symbol: "BTCUSDT", // Buraya istediğin sembolü gönderebilirsin
                        interval: "1h",    // Buraya istediğin zaman aralığını gönderebilirsin
                    }),
                });

                const data = await response.json();

                if (data.status === "success" && data.data) {
                    // FastAPI'den gelen veriyi Lightweight Charts formatına çevir
                    const formattedData = data.data.map((candle) => ({
                        time: Math.floor(new Date(candle.timestamp).getTime() / 1000), // Unix timestamp (saniye cinsinden)
                        open: candle.open,
                        high: candle.high,
                        low: candle.low,
                        close: candle.close,
                    }));

                    setChartData(formattedData);
                }
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        if (chartData.length === 0 || !chartContainerRef.current) return;
    
        // 🔹 Grafiği oluşturma ayarları
        const chartOptions = { 
            layout: { 
                textColor: 'white', 
                background: { type: 'solid', color: 'black' }  // Siyah arka plan
            },
            grid: {
                vertLines: {
                    color: 'rgba(128, 128, 128, 0.3)',  // Gri ve %30 saydam dikey çizgiler
                    style: 1, // Solid çizgi
                },
                horzLines: {
                    color: 'rgba(128, 128, 128, 0.3)',  // Gri ve %30 saydam yatay çizgiler
                    style: 1, // Solid çizgi
                }
            },
            crosshair: {
                mode: CrosshairMode.Normal // 🔥 Mıknatıs etkisini kapatır
            }
        };
      
        // 🔹 Grafiği oluştur
        const chart = createChart(chartContainerRef.current, chartOptions);
      
        // 🔹 Mum grafiğini ekle ve stil ver
        const candleSeries = chart.addCandlestickSeries({
            upColor: '#26a69a', 
            downColor: '#ef5350', 
            borderVisible: false, 
            wickUpColor: '#26a69a', 
            wickDownColor: '#ef5350'
        });
      
        candleSeries.setData(chartData);
      
        // 🔹 Grafiği içeriğe sığdır
        chart.timeScale().fitContent();
      
        // 🔹 Pencere boyutu değiştiğinde yeniden boyutlandır
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
      
        window.addEventListener("resize", handleResize);
      
        // 🔹 Cleanup: Bileşen unmount olduğunda chart'ı kaldır
        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [chartData]);
  
  

    return (
        <div>
            <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }}></div>
        </div>
    );
}*/


"use client";
import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

export default function ExampleChart() {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // 📌 Grafik ayarları
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                background: { type: "solid", color: "#000" },
                textColor: "white",
            },
            grid: {
                vertLines: { color: "rgba(128, 128, 128, 0.3)" },
                horzLines: { color: "rgba(128, 128, 128, 0.3)" },
            },
            crosshair: { mode: CrosshairMode.Normal },
        });

        // 📌 Mum Grafiği Serisi
        const candleSeries = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
        });

        // 📌 Örnek (dummy) veriler
        const exampleData = [
            { time: 1710000000, open: 43000, high: 43500, low: 42800, close: 43250 },
            { time: 1710003600, open: 43250, high: 43800, low: 43100, close: 43600 },
            { time: 1710007200, open: 43600, high: 44000, low: 43400, close: 43850 },
            { time: 1710010800, open: 43850, high: 44200, low: 43700, close: 44050 },
            { time: 1710014400, open: 44050, high: 44500, low: 43900, close: 44300 },
        ];

        // 📌 Grafiğe örnek veriyi ekle
        candleSeries.setData(exampleData);

        // 📌 Grafiği tam ekran sığdır
        chart.timeScale().fitContent();

        // 📌 Pencere boyutu değiştiğinde yeniden ölçekleme
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        window.addEventListener("resize", handleResize);

        // 📌 Cleanup: Bileşen kaldırıldığında grafik silinsin
        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    return <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />;
}

