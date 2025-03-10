"use client";
import { CrosshairMode } from "lightweight-charts"; // 📌 CrosshairMode ekle
import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useLogout } from "@/utils/HookLogout"; 

export default function ChartComponent({ symbol = "BTCUSDT", interval = "1h" }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const handleLogout = useLogout();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/get-binance-data/?symbol=${symbol}&interval=${interval}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include", // Kullanıcı doğrulaması için cookies gönder
                    }
                );

                if (response.status === 401) {
                    const errorData = await response.json();
                    if (errorData.detail === "Token expired") {
                        alert("Oturum süresi doldu! Lütfen tekrar giriş yapın.");
                        handleLogout();  // 🔥 Kullanıcıyı çıkışa yönlendir
                        return;
                    }
                }

                if (response.status === 401) {
                    const errorData = await response.json();
                    if (errorData.detail === "Invalid token") {
                        alert("Kullanıcı doğrulanamadı! Lütfen tekrar giriş yapın.");
                        handleLogout();  // 🔥 Kullanıcıyı çıkışa yönlendir
                        return;
                    }
                }

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
    }, [symbol, interval]); // 🔹 Kullanıcı farklı bir sembol veya zaman aralığı seçerse API çağrısı tekrar yapılır

    useEffect(() => {
        if (chartData.length === 0 || !chartContainerRef.current) return;

        // 🔹 Grafiği oluşturma ayarları
        const chartOptions = {
            layout: {
                textColor: "white",
                background: { type: "solid", color: "black" }, // Siyah arka plan
            },
            grid: {
                vertLines: {
                    color: "rgba(128, 128, 128, 0.6)", // Gri ve %30 saydam dikey çizgiler
                    style: 1, // Solid çizgi
                },
                horzLines: {
                    color: "rgba(128, 128, 128, 0.6)", // Gri ve %30 saydam yatay çizgiler
                    style: 1, // Solid çizgi
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal, // 🔥 Mıknatıs etkisini kapatır
            },
        };

        // 🔹 Grafiği oluştur
        const chart = createChart(chartContainerRef.current, chartOptions);

        // 🔹 Mum grafiğini ekle ve stil ver
        const candleSeries = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
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
}
