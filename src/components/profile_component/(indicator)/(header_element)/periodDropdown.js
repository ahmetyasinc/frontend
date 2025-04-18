"use client";

import { useRef, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import useCryptoStore from "@/store/cryptoPinStore"; // Zustand store'u import et

const PeriodDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { selectedPeriod, setSelectedPeriod } = useCryptoStore(); // Zustand'dan state al

  const options = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "1d", "1w"];

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
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-[106px] flex items-center bg-gray-900 hover:bg-gray-800 pl-3 py-2 rounded-md transition"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedPeriod}
        <BiChevronDown className="ml-auto text-[22px] mr-2" />
      </button>

      {isDropdownOpen && (
        <ul className="absolute top-full left-0 bg-gray-900 shadow-lg rounded-md mt-2 w-28 list-none p-0">
          {options.map((option) => (
            <li
              key={option}
              className="py-2 hover:bg-gray-800 cursor-pointer text-left pl-4"
              onClick={() => {
                setSelectedPeriod(option); // Zustand state'ini güncelle
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PeriodDropdown;
