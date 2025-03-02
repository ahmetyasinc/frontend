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
        <div className="flex justify-center items-center h-screen bg-[rgb(3,8,12)]">
          <div className="text-center">
            <div
              className="w-20 h-20 border-5 border-dashed rounded-full animate-spin [animation-duration:3s] border-[#9cf0ff] mx-auto"
            ></div>
            <h2 className="text-white dark:text-white mt-4 text-lg">Yükleniyor...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Bu işlem birkaç saniye sürebilir.
            </p>
          </div>

        </div>
    );
}
