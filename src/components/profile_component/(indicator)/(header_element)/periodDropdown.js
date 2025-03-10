"use client";

import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

const PeriodDropdown = ({ selectedOption, setSelectedOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ["1 dk", "3 dk", "5 dk", "15 dk", "30 dk", "1 saat", "2 saat", "4 saat", "1 gün", "1 hafta"];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

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
        className="w-[106px] flex items-center bg-gray-800 hover:bg-gray-700 pl-3 py-2 rounded-md transition"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption}
        <BiChevronDown className="ml-auto text-[22px] mr-2" />
      </button>

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
  );
};

export default PeriodDropdown;
