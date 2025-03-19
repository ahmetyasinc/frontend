"use client";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useIndicatorStore from "@/store/indicatorStore"; // Zustand Store'u import et

const ShowHideButton = ({ indicatorId }) => {
    const { isVisible, toggleIndicator } = useIndicatorStore(); // Zustand'dan state çek

    return (
        <button
            className={`bg-transparent p-2 rounded-md transition-all ${
                isVisible[indicatorId] ? "hover:bg-green-800" : "hover:bg-gray-800"
            }`}
            onClick={() => toggleIndicator(indicatorId)}
        >
            {isVisible[indicatorId] ? (
                <IoEyeOutline className="text-[#55c03a] hover:text-[#78eb5b] text-xl cursor-pointer" />
            ) : (
                <IoEyeOffOutline className="text-[rgb(216,110,39)] hover:text-[hsl(24,83%,60%)] text-xl cursor-pointer" />
            )}
        </button>
    );
};

export default ShowHideButton;
