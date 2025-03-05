"use client";

import { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiPlus,  BiSolidMagnet} from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { LuRuler } from "react-icons/lu";
import { BsBrush } from "react-icons/bs";
import { FiNavigation } from "react-icons/fi";

const IndicatorHeader = () => {
  const [selectedOption, setSelectedOption] = useState("Periyot");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const dropdownRef = useRef(null); // Dropdown menüyü takip etmek için referans

  const options = ["1 dk", "5 dk", "15 dk", "30 dk", "1 saat", "2 saat", "4 saat", "1 gün", "1 hafta", "1 ay"]; 

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  // Sayfanın herhangi bir yerine tıklanınca dropdown'u kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-gray-800 shadow-md flex justify-between items-center py-3 fixed top-0 left-0 right-0 z-50 h-[61px] pl-16">
      
      {/* Butonlar ve Dropdown Grubu */}
      <div className="flex gap-2 items-center">

        {/* İlk Buton */}
        <button className="ml-2 mr-3 flex items-center justify-center w-[100px] h-[40px] rounded-md transition-all duration-200 bg-green-500 hover:bg-green-600 text-white">
          kripto seçin
        </button>

        {/* Dropdown Menü (İlk Butonun Sağında) */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="w-[106px] flex items-center bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedOption}
            <BiChevronDown className="ml-2" />
          </button>

          {/* Dropdown İçeriği */}
          {isDropdownOpen && (
            <ul className="absolute top-full left-0 bg-gray-900 shadow-lg rounded-md mt-2 w-28 list-none p-0">
              {options.map((option) => (
                <li
                  key={option}
                  className="py-2 hover:bg-gray-800 cursor-pointer text-left pl-4"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Diğer Butonlar */}
        <button className="ml-3 flex items-center justify-center w-[130px] h-[40px] rounded-md transition-all duration-200 bg-green-500 hover:bg-green-600 text-white">
        <FiNavigation  className="mr-2 text-[19px]" /> Göstergeler
        </button>

        <button className=" ml-3 flex items-center justify-center w-[85px] h-[40px] rounded-md transition-all duration-200 bg-green-500 hover:bg-green-600 text-white">
        <BsBrush className="mr-2 text-[19px]"/> Çizim
        </button>

        {/* Magnet Butonu (Sadece bunda Active olacak) */}
        <button
          onClick={() => setActiveButton(activeButton === "magnet" ? null : "magnet")}
          className={`ml-3 flex items-center  justify-center gap-2 rounded-md transition-all duration-200 w-[50px] h-[40px] text-[23px]
            ${activeButton === "magnet" ? "scale-95 bg-gray-600 border-blue-500 text-blue-500" : "bg-gray-800"} text-white`}
        >
          <BiSolidMagnet className="group-hover:text-blue-500 transition-all duration-150" />
        </button>

        <button className="flex items-center justify-center w-[50px] h-[40px] rounded-md  bg-gray-800 text-white group text-[23px]">
          <LuRuler className="group-hover:text-blue-500 transition-all duration-150" />
        </button>


        <button className="ml-[615px] flex items-center justify-center w-[50px] h-[40px] rounded-md  bg-gray-800 text-white group text-[25px]">
          <IoMdSettings className="group-hover:text-blue-500 transition-all duration-150" />
        </button>



      </div>
    </div>
  );
};

export default IndicatorHeader;
