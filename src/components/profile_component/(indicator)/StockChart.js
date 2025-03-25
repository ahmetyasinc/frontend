"use client";
import { CrosshairMode } from "lightweight-charts";
import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useLogout } from "@/utils/HookLogout";
import useMagnetStore from "@/store/magnetStore";
import useCryptoStore from "@/store/cryptoPinStore";
import useIndicatorDataStore from "@/store/indicatorDataStore"; // ✅ eklendi

export default function ChartComponent({ symbol = "BTCUSDT", interval = "1d" }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const handleLogout = useLogout();
    const { isMagnetMode } = useMagnetStore();
    const { selectedCrypto, selectedPeriod } = useCryptoStore();
    const { indicatorData } = useIndicatorDataStore(); // ✅ burada

    useEffect(() => {
        async function fetchData() {
            try {
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
    }, [selectedCrypto, selectedPeriod]);

    useEffect(() => {
        if (chartData.length === 0 || !chartContainerRef.current) return;

        if (chartRef.current) {
            try {
                chartRef.current.remove();
            } catch (error) {
                console.warn("Grafik temizleme hatası:", error);
            }
        }

        const chart = createChart(chartContainerRef.current, {
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
        });

        chartRef.current = chart;

        chart.applyOptions({
            watermark: {
                color: "#222",
                visible: true,
                text: "BTCUSDT",
                fontSize: 18,
                horzAlign: "center",
                vertAlign: "center",
            },
        });

        const candleSeries = chart.addCandlestickSeries({
            upColor: "white",
            downColor: "rgb(214, 0, 0)",
            borderVisible: false,
            wickUpColor: "rgb(214, 0, 0)",
            wickDownColor: "rgb(214, 0, 0)",
        });

        candleSeries.setData(chartData);
        chart.timeScale().fitContent();

        // ✅ GÜNCELLENEN KISIM — tüm indicatorData içinden on_graph === true olanları çiz
        Object.values(indicatorData).forEach((indicatorInfo) => {
            if (!indicatorInfo?.indicator_result) return;
            indicatorInfo.indicator_result
                .filter((item) => item.on_graph === true)
                .forEach(({ type, settings, data }) => {
                    let series;
                    switch (type) {
                        case "line":
                            series = chart.addLineSeries({
                                color: settings?.color || "yellow",
                                lineWidth: settings?.line_width || 2,
                            });
                            break;
                        case "area":
                            series = chart.addAreaSeries({
                                topColor: settings?.color || "rgba(33, 150, 243, 0.5)",
                                bottomColor: "rgba(33, 150, 243, 0.1)",
                                lineColor: settings?.color || "blue",
                            });
                            break;
                        case "histogram":
                            series = chart.addHistogramSeries({
                                color: settings?.color || "green",
                            });
                            break;
                        default:
                            series = chart.addLineSeries({ color: "white", lineWidth: 2 });
                    }

                    const timeValueMap = new Map();
                    data.forEach(([time, value]) => {
                        if (typeof time === "string" && value !== undefined) {
                            const unixTime = Math.floor(new Date(time).getTime() / 1000);
                            timeValueMap.set(unixTime, value);
                        }
                    });

                    const formattedData = Array.from(timeValueMap.entries())
                        .sort(([a], [b]) => a - b)
                        .map(([time, value]) => ({ time, value }));

                    series.setData(formattedData);
                });
        });

        const resizeObserver = new ResizeObserver(() => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight,
                });
            }
        });

        resizeObserver.observe(chartContainerRef.current);

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
    }, [chartData, indicatorData, isMagnetMode]); // ✅ indicatorData da dinleniyor

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.applyOptions({
                crosshair: {
                    mode: isMagnetMode ? CrosshairMode.Magnet : CrosshairMode.Normal,
                },
            });
        }
    }, [isMagnetMode]);

    return (
        <div className="relative w-full h-full">
            <div ref={chartContainerRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
}
