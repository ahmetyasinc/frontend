"use client";

import { useEffect, useState } from "react";
import { IoIosCode, IoIosStarOutline, IoMdSearch, IoMdStar } from "react-icons/io";
import ShowHideButton from "./show_hide_button";
import useIndicatorStore from "@/store/indicatorStore"; // Zustand Store'u import et
import CodeModal from "./CodeModal";
import axios from "axios";

axios.defaults.withCredentials = true; // Tüm axios isteklerinde cookie'yi göndermeyi etkinleştir

const CommunityIndicators = () => {
    const { favorites, toggleFavorite, setCommunityIndicators, community } = useIndicatorStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndicator, setSelectedIndicator] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // API'den veri çekme fonksiyonu
    useEffect(() => {
        if (community.length > 0) return; // Eğer daha önce veri çekildiyse tekrar çekme

        const fetchIndicators = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/public-indicators/");
                const fetchedIndicators = response.data.public_indicators || [];
                setCommunityIndicators(fetchedIndicators);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchIndicators();
    }, [community.length, setCommunityIndicators]);

    // Favori ekleme/kaldırma fonksiyonu
    const handleToggleFavorite = async (indicator) => {
        const isAlreadyFavorite = favorites.some((fav) => fav.id === indicator.id);
        toggleFavorite(indicator);
        
        try {
            if (isAlreadyFavorite) {
                await axios.delete("http://localhost:8000/api/indicator-remove-favourite/", {
                    data: { indicator_id: indicator.id }
                });                
            } else {
                await axios.post("http://localhost:8000/api/indicator-add-favorite/", {
                    indicator_id: indicator.id
                });
            }
        } catch (error) {
            console.error("Favori işlemi sırasında hata oluştu:", error);
        }
    };

    // Kod Modalını Açma Fonksiyonu
    const openCodeModal = (indicator) => {
        setSelectedIndicator(indicator);
        setIsModalOpen(true);
    };

    return (
        <div className="text-white">
            {/* Arama Çubuğu */}
            <div className="bg-gray-800 flex items-center border-b border-gray-800 mb-2">
                <input
                    type="text"
                    placeholder="Ara..."
                    className="w-full px-3 py-2 bg-gray-800 text-white focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IoMdSearch className="text-gray-400 text-[20px] mr-2" />
            </div>

            {/* İndikatör Listesi */}
            <div className="flex flex-col gap-2 w-full mt-2 max-h-[440px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {community
                    .filter((indicator) =>
                        indicator.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((indicator) => (
                        <div
                            key={indicator.id}
                            className="bg-gray-900 hover:bg-gray-800 pl-1 pr-2 flex items-center justify-between w-full h-[40px]"
                        >
                            {/* Kartın sol kısmı */}
                            <div className="flex items-center">
                                <button
                                    className="bg-transparent p-2 rounded-md hover:bg-gray-800"
                                    onClick={() => handleToggleFavorite(indicator)}
                                >
                                    {favorites.some((fav) => fav.id === indicator.id) ? (
                                        <IoMdStar className="text-lg text-yellow-500" />
                                    ) : (
                                        <IoIosStarOutline className="text-lg text-gray-600" />
                                    )}
                                </button>
                                <span className="text-[14px]">{indicator.name}</span>
                            </div>

                            {/* Kartın sağ kısmı */}
                            <div className="flex gap-2">
                                {/* Göster/Gizle Butonu */}
                                <ShowHideButton indicatorId={indicator.id} />

                                {/* Kod Butonu */}
                                <button
                                    className="bg-transparent p-2 rounded-md hover:bg-gray-800"
                                    onClick={() => openCodeModal(indicator)}
                                >
                                    <IoIosCode className="text-[hsl(305,57%,44%)] hover:text-[#eb48dd] text-2xl cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Kod Modalı */}
            <CodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} indicator={selectedIndicator} />
        </div>
    );
};

export default CommunityIndicators;
