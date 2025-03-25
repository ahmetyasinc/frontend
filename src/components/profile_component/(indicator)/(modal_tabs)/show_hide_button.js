"use client";

import { useCallback } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useIndicatorStore from "@/store/indicatorStore";
import usePanelStore from "@/store/panelStore";
import useCryptoStore from "@/store/cryptoPinStore";
import useIndicatorDataStore from "@/store/indicatorDataStore";
import axios from "axios";

axios.defaults.withCredentials = true;

const ShowHideButton = ({ indicatorId }) => {
    const { isVisible, toggleIndicator } = useIndicatorStore();
    const { end } = usePanelStore();
    const { selectedCrypto, selectedPeriod } = useCryptoStore();
    const { setIndicatorData, clearIndicatorData } = useIndicatorDataStore(); // ✅ Clear fonksiyonu eklendi

    const fetchIndicatorData = useCallback(async () => {
        try {
            if (!selectedCrypto?.binance_symbol || !selectedPeriod || !indicatorId) {
                console.warn("Eksik veri ile API çağrısı engellendi.");
                return;
            }

            const response = await axios.post("http://localhost:8000/api/run-indicator/", {
                indicator_id: indicatorId,
                binance_symbol: selectedCrypto.binance_symbol,
                interval: selectedPeriod,
                end: end,
            });

            console.log("== RESPONSE ==")
            console.log(response)

            const { indicator_result = [], prints = [] } = response.data || {};
            setIndicatorData(indicatorId, indicator_result, prints);
        } catch (error) {
            console.error("Indicator verisi çekilirken hata oluştu:", error);
        }
    }, [indicatorId, selectedCrypto, selectedPeriod, end, setIndicatorData]);

    const handleClick = async () => {
        const currentlyVisible = isVisible[indicatorId];

        if (currentlyVisible) {
            // 👁‍🗨 Kapatılmak isteniyor → veriyi sil
            clearIndicatorData(indicatorId);
        } else {
            // 🔍 Açılmak isteniyor → veriyi çek
            await fetchIndicatorData();
        }

        toggleIndicator(indicatorId); // Görünürlüğü en son değiştir
    };

    const isShown = isVisible[indicatorId];

    return (
        <button
            className={`bg-transparent p-2 rounded-md transition-all ${
                isShown ? "hover:bg-green-800" : "hover:bg-gray-800"
            }`}
            onClick={handleClick}
        >
            {isShown ? (
                <IoEyeOutline className="text-[#55c03a] hover:text-[#78eb5b] text-xl cursor-pointer" />
            ) : (
                <IoEyeOffOutline className="text-[rgb(216,110,39)] hover:text-[hsl(24,83%,60%)] text-xl cursor-pointer" />
            )}
        </button>
    );
};

export default ShowHideButton;
