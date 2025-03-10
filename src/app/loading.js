"use client";
import { useEffect } from "react";

export default function Loading() { 
    useEffect(() => {
        const originalTitle = document.title; // Mevcut title'ı sakla
        document.title = "Yükleniyor..."; // Geçici title'ı ayarla

        return () => {
            document.title = originalTitle; // Sayfa yüklenince eski title'a geri dön
        };
    }, []);

    return (
<div className="flex justify-center items-center h-screen bg-[hsl(226,76%,3%)]">
  <div className="text-center flex flex-col items-center">
    {/* Spinner */}
    <div className="w-24 h-24 border-5 border-transparent text-[#395cbd] text-2xl animate-spin flex items-center justify-center border-t-[#395cbd] rounded-full">
      <div className="w-20 h-20 border-5 border-transparent text-[#395cbd] text-4xl animate-spin flex items-center justify-center border-t-[#395cbd] rounded-full"></div>
    </div>
    
    {/* Yazılar */}
    <h2 className="text-white dark:text-white mt-4 text-lg">Yükleniyor...</h2>
    <p className="text-zinc-400 dark:text-zinc-400">
      Bu işlem birkaç saniye sürebilir.
    </p>
  </div>
</div>

    );
}




