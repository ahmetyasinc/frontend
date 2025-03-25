"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import useIndicatorDataStore from "@/store/indicatorDataStore";
import PropTypes from "prop-types";

export default function PanelChart({ indicatorId }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const { indicatorData } = useIndicatorDataStore();

    useEffect(() => {
        const indicatorInfo = indicatorData[indicatorId];
        if (!chartContainerRef.current || !indicatorInfo) return;

        const { prints, indicator_result } = indicatorInfo;
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
            timeScale: { visible: true },
        });

        chartRef.current = chart;

        // 🔁 Tüm on_graph === false indikatörleri çiz
        indicator_result
            .filter((item) => item.on_graph === false)
            .forEach(({ type, settings, data, name }) => {
                let series;
                switch (type) {
                    case "line":
                        series = chart.addLineSeries({
                            color: settings?.color || "white",
                            lineWidth: settings?.line_width || 2,
                        });
                        break;
                    case "histogram":
                        series = chart.addHistogramSeries({
                            color: settings?.color || "green",
                        });
                        break;
                    case "area":
                        series = chart.addAreaSeries({
                            topColor: settings?.color || "rgba(33, 150, 243, 0.5)",
                            bottomColor: "rgba(33, 150, 243, 0.1)",
                            lineColor: settings?.color || "blue",
                        });
                        break;
                    default:
                        series = chart.addLineSeries({
                            color: "white",
                            lineWidth: 2,
                        });
                }

                // 1. Duplicate time değerlerini engelleyen map
                const timeValueMap = new Map();
                            
                data.forEach(([time, value]) => {
                    if (typeof time === "string" && value !== undefined) {
                        const unixTime = Math.floor(new Date(time).getTime() / 1000); // ✅ UNIX timestamp
                        timeValueMap.set(unixTime, value); // son değeri yazar
                    }
                });
                
                // 2. Sıralı diziye çevir
                const formattedData = Array.from(timeValueMap.entries())
                    .sort(([timeA], [timeB]) => timeA - timeB)
                    .map(([time, value]) => ({ time, value }));
                
                console.log("formattedData (uniq & sorted):", formattedData);

                series.setData(formattedData);
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
            chart.remove();
        };
    }, [indicatorData, indicatorId]);

    return (
        <div className="relative w-full h-full">
            <div ref={chartContainerRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
}

PanelChart.propTypes = {
    indicatorId: PropTypes.string.isRequired,
};
