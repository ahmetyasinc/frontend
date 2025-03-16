"use client";

import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { LuRuler } from "react-icons/lu";
import { BiSolidMagnet } from "react-icons/bi";
import CryptoSelectButton from "./(header_element)/cryptoSelectButton"; // Kripto seçim butonu
import PeriodDropdown from "./(header_element)/periodDropdown"; // Periyot dropdown
import IndicatorsModalButton from "./(header_element)/indcModalButton"; // Göstergeler butonu
import DrawButton from "./(header_element)/drawButton"; // Çizim butonu
import StrategyButton from "./(header_element)/strategyModalButton"; // Stratejilerim butonu
import useMagnetStore from "@/store/magnetStore";
import useRulerStore from "@/store/rulerStore"; // Cetvel store'u import et



const IndicatorHeader = () => {
  const [selectedOption, setSelectedOption] = useState("Periyot");
  const [activeButton, setActiveButton] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const { isMagnetMode, toggleMagnetMode } = useMagnetStore();
  const { isRulerMode, toggleRulerMode } = useRulerStore();


  return (
    <div className="w-full bg-gray-950 shadow-md flex justify-between items-center py-3 fixed top-0 left-0 right-0 z-50 h-[61px] pl-16">
      
    {/* Butonlar ve Dropdown Grubu */}
    <div className="flex gap-2 items-center w-full">

      {/* Kripto Seçim Butonu */}
      <CryptoSelectButton selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} />
      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>

      {/* Periyot Seçimi */}
      <PeriodDropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>

      {/* Göstergeler Butonu */}
      <IndicatorsModalButton />
      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>

      {/* Stratejilerim Butonu */}
      <StrategyButton />
      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>

      {/* Çizim Butonu */}
      <DrawButton />
      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>

      {/* Magnet Butonu */}
      <button
        onClick={toggleMagnetMode}
        className="mr-[2px] flex items-center justify-center w-[50px] h-[40px] rounded-md transition-all duration-200 bg-gray-900 hover:bg-gray-800 text-[22px]"
      >
        <BiSolidMagnet 
          className={`transition-all duration-150 
            ${isMagnetMode ? "text-blue-500 text-[24px]" : "text-white hover:text-blue-900"}`} 
        />
      </button>

      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>

      {/* Cetvel Butonu */}
      <button 
        onClick={toggleRulerMode}
        className={`flex items-center justify-center w-[50px] h-[40px] rounded-md transition-all duration-200 
          ${isRulerMode ? "bg-blue-500 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"} text-[23px]`}
      >
        <LuRuler />
      </button>
      <div className="h-[30px] w-[1px] bg-gray-600 mx-2"></div>
      

      {/* Ayarlar Butonu */}
      <button className="ml-auto mr-2 flex items-center justify-center w-[50px] h-[40px] rounded-md transition-all duration-200 bg-gray-950 hover:bg-gray-800 text-white text-[25px]">
        <IoMdSettings />
      </button>
    </div>
  </div>

  );
};

export default IndicatorHeader;
