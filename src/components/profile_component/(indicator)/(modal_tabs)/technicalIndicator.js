"use client";

import { IoIosCode, IoIosStarOutline } from "react-icons/io";
import { IoMdSearch, IoMdStar } from "react-icons/io"; // Arama ikonu
import ShowHideButton from "./show_hide_button"; // Göster/Gizle butonu
import { useState } from "react";
import CodeModal from "./CodeModal"; // Kod modalı bileşeni


const TechnicalIndicators = ({ addFavorite, favorites }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Arama çubuğu için state
  const [selectedIndicator, setSelectedIndicator] = useState(null); // Seçilen indikatör
  const [isModalOpen, setIsModalOpen] = useState(false);


  // İndikatörler listesi
  const indicators = [
    { name: "RSI", id: 1, code: "// RSI hesaplama kodu..." },
    { name: "MACD", id: 2, code: "// MACD hesaplama kodu..." },
    { name: "Bollinger Bantları", id: 3, code: "// Bollinger Bantları hesaplama kodu..." },
    { name: "MA", id: 4, code: "// MA hesaplama kodu..." },
    { name: "Stokastik Osilatör", id: 5, code: "// Stokastik Osilatör hesaplama kodu..." },
    { name: "Hacim", id: 6, code: "// Hacim hesaplama kodu..." },
    { name: "Stokastik RSI", id: 7, code: "// Stokastik RSI hesaplama kodu..." },
    { name: "Fisher", id: 8, code: "// Fisherhesaplama kodu..." },
    { name: "SMI", id: 9, code: "// SMI hesaplama kodu..." },
    { name: "Chande Momentum", id: 10, code: "// Chande Momentum hesaplama kodu..." },
    { name: "ADX", id: 11, code: "// ADX hesaplama kodu..." },
    { name: "ATR", id: 12, code: "// ATRhesaplama kodu..." },
    { name: "DEMA", id: 13, code: "// DEMAhesaplama kodu..." },
    { name: "Hacim ağırlıklı Hareketli ortalama (WMA)", id: 14, code: "//Hacim ağırlıklı Hareketli ortalama (WMA) hesaplama kodu..." },
    { name: "Para akış endeksi (MFI)", id: 15, code: "// Para akış endeksi (MFI) hesaplama kodu..." },
    { name: "Ichimoku Bulutu", id: 16, code: "// Ichimoku Bulutu hesaplama kodu..." },
    { name: "Keltner Kanalı", id: 17, code: "// Keltner Kanalı hesaplama kodu..." },
    { name: "Williams %R", id: 18, code: "// Williams %R hesaplama kodu..." },
  ];

  // Favorilere ekleme fonksiyonu
  const toggleFavorite = (indicator) => {
    addFavorite(indicator);
  };


  // İndikatörün görünürlüğünü değiştiren fonksiyon
  const toggleIndicator = (indicatorId, isActive) => {
    console.log(`İndikatör ${indicatorId} durumu: ${isActive ? "Açık" : "Kapalı"}`);
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

      {/* Kaydırılabilir alan */}
      <div className="flex flex-col gap-2 w-full mt-2 max-h-[440px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {indicators.filter((indicator) =>
          indicator.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 ? (
          <div className="text-center text-gray-400 py-4">Gösterge Bulunamadı...</div>
        ) : (
          indicators
            .filter((indicator) =>
              indicator.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((indicator) => (
              <div
                key={indicator.id}
                className="bg-gray-900 hover:bg-gray-800 pl-2 pr-2 flex items-center justify-between w-full h-[40px]"
              >
                {/* Kartın sol kısmı */}
                <div className="flex items-center">
                <button
                  className="bg-transparent p-2 rounded-md hover:bg-gray-800"
                  onClick={() => toggleFavorite(indicator)}
                >
                  {favorites.some((fav) => fav.id === indicator.id) ? (
                    <IoMdStar className="text-lg text-yellow-500" />
                  ) : (
                    <IoIosStarOutline className="text-lg text-yellow-500" />
                  )}
                </button>
                  <span className="text-[14px]">{indicator.name}</span>
                </div>

                {/* Kartın sağ kısmı */}
                <div className="flex gap-2">
                  {/* Göster/Gizle Butonu */}
                  <ShowHideButton indicatorId={indicator.id} onToggle={toggleIndicator} />

                  {/* Kod Butonu */}
                  <button 
                    className="bg-transparent p-2 rounded-md hover:bg-gray-800"
                    onClick={() => openCodeModal(indicator)}
                  >
                    <IoIosCode className="text-[hsl(305,57%,44%)] hover:text-[#eb48dd] text-2xl cursor-pointer" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Kod Görüntüleme Modalı */}
      <CodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} indicator={selectedIndicator} />
    </div>
  );

};

export default TechnicalIndicators;
