"use client";

import { IoIosStarOutline, IoMdStar, IoIosCode } from "react-icons/io";
import ShowHideButton from "./show_hide_button";

const FavoriteIndicators = ({ favorites, addFavorite }) => {

  const toggleFavorite = (indicator) => {
    addFavorite(indicator);
  };

  const toggleIndicator = (indicatorId, isActive) => {
    console.log(`İndikatör ${indicatorId} durumu: ${isActive ? "Açık" : "Kapalı"}`);
  };

  const openCodeModal = (indicator) => {
    setSelectedIndicator(indicator);
  };

  return (
    <div className="text-white mt-2">
      {favorites.length === 0 ? (
        <p className="text-gray-400 ml-52 mt-8">Henüz favori eklenmedi.</p>
      ) : (
        <div className="max-h-[470px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {favorites.map((indicator) => (
            <div
              key={indicator.id}
              className="bg-gray-900 hover:bg-gray-800 pl-2 pr-2 flex items-center justify-between w-full h-[40px] p-2"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteIndicators;
