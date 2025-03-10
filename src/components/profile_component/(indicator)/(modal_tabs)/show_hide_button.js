"use client";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ShowHideButton = ({ indicatorId, onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onToggle) onToggle(indicatorId, !isActive); // Hangi indikatör değişti, yeni durumu ne?
  };

  return (
    <button
      className={`bg-transparent p-2 rounded-md transition-all ${
        isActive ? "hover:bg-green-800" : "hover:bg-gray-800"
      }`}
      onClick={handleClick}
    >
      {isActive ? (
        <IoEyeOutline className="text-[#55c03a] hover:text-[#78eb5b] text-xl cursor-pointer" />
      ) : (
        <IoEyeOffOutline className="text-[rgb(216,110,39)] hover:text-[hsl(24,83%,60%)] text-xl cursor-pointer" />
      )}
    </button>
  );
};

export default ShowHideButton;
