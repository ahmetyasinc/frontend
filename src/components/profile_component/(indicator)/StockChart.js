"use client";
import { CrosshairMode } from "lightweight-charts"; 
import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useLogout } from "@/utils/HookLogout"; 
import useMagnetStore from "@/store/magnetStore"; 
import useCryptoStore from "@/store/cryptoPinStore"; 


export default function ChartComponent({ symbol = "BTCUSDT", interval = "1d" }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const priceLineRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const handleLogout = useLogout();   
    const { isMagnetMode } = useMagnetStore();
    const { selectedCrypto, selectedPeriod } = useCryptoStore();

        //lineStyle: LineStyle.Dashed,    Kesikli çizgi
        // lineStyle: LineStyle.Solid,      ➝ Düz çizgi
        // lineStyle: LineStyle.Dotted,     ➝ Noktalı çizgi
        // lineStyle: LineStyle.Dashed,     ➝ Kesikli çizgi
        // lineStyle: LineStyle.LargeDashed,  ➝ Büyük kesikli çizgi
        // lineStyle: LineStyle.SparseDotted,  ➝ Seyrek noktalı çizgi 

    useEffect(() => {
        async function fetchData() {
            try {
                console.log(selectedCrypto.binance_symbol)
                console.log(selectedPeriod)
                const response = await fetch(
                    `http://localhost:8000/api/get-binance-data/?symbol=${selectedCrypto.binance_symbol || symbol}&interval=${selectedPeriod}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
    
                if (response.status === 401) {
                    const errorData = await response.json();
                    if (["Token expired", "Invalid token"].includes(errorData.detail)) {
                        alert("Oturum süresi doldu veya geçersiz token! Lütfen tekrar giriş yapın.");
                        handleLogout();
                        return;
                    }
                }
    
                const data = await response.json();
    
                if (data.status === "success" && data.data) {
                    const formattedData = data.data.map((candle) => ({
                        time: Math.floor(new Date(candle.timestamp).getTime() / 1000), 
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
    
    }, [selectedCrypto, selectedPeriod]); // selectedCrypto değiştiğinde yeniden çalışır
         

    useEffect(() => {
        if (chartData.length === 0 || !chartContainerRef.current) return;
    
        // 📌 Eğer önceki grafik varsa temizleyelim
        if (chartRef.current) {
            try {
                chartRef.current.remove(); // 🔥 Önceki grafiği temizle
            } catch (error) {
                console.warn("Grafik temizleme hatası:", error);
            }
        }
    
        // 🔹 Grafiği oluşturma ayarları
        const chartOptions = {
            layout: {
                textColor: "white",
                background: { type: "solid", color: "#111" },
            },
            grid: {
                vertLines: { color: "#222", style: 1 },
                horzLines: { color: "#222", style: 1 },
            },
            crosshair: {
                mode: isMagnetMode ? CrosshairMode.Magnet : CrosshairMode.Normal,
            }, 
        };
    
        // 🔹 Grafiği oluştur
        const chart = createChart(chartContainerRef.current, chartOptions);
        chartRef.current = chart;

        chart.applyOptions({
            watermark: {
                color: '#222',
                visible: true,
                text: 'BTCUSDT',
                fontSize: 18,
                horzAlign: 'center',
                vertAlign: 'center',
            },
        });
    
        // 🔹 Mum grafiğini ekle
        const candleSeries = chart.addCandlestickSeries({
            upColor: "white",
            downColor: "rgb(214, 0, 0)",
            borderVisible: false,
            wickUpColor: "rgb(214, 0, 0)",
            wickDownColor: "rgb(214, 0, 0)",
        });
    
        candleSeries.setData(chartData);
        chart.timeScale().fitContent();

    
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
    
        // 🛑 Cleanup: Bileşen unmount olduğunda işlemleri temizle
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
    
    }, [chartData]); // 🔥 `chartData` değiştiğinde çalışır
    

// 🔥 Mıknatıs modu değiştiğinde sadece crosshair modunu güncelle!
useEffect(() => {
    if (chartRef.current) {
        chartRef.current.applyOptions({
            crosshair: {
                mode: isMagnetMode ? CrosshairMode.Magnet : CrosshairMode.Normal,
            },
        });
    }
}, [isMagnetMode]); // 🟢 Sadece mıknatıs modu değiştiğinde çalışır!



    return (
        <div className="relative w-full h-full">
            <div ref={chartContainerRef} className="absolute top-0 left-0 w-full h-full"></div>
        </div>
    );
}
