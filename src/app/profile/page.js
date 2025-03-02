"use client"; // ✅ Client Component olduğu için eklenmeli

import { useState } from "react";
import apiClient from "@/utils/apiclient"; // ✅ Axios instance'ı içe aktar
import { useRouter } from "next/navigation";

export default function Profile() {
    const [responseData, setResponseData] = useState(null);
    const router = useRouter();

    const testApiRequest = async () => {
        try {
            const response = await apiClient.get("http://127.0.0.1:8000/api/fake-unauthorized/");
            setResponseData(response.data); // Yanıtı ekrana yazdırmak için state'e kaydet
            console.log("✅ API Yanıtı:", response.data);
        } catch (error) {
            console.error("🚨 API Hatası:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            
            <button 
                onClick={testApiRequest} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                API Test Et
            </button>

            {/* API Yanıtını Göster */}
            {responseData && (
                <div className="mt-4 p-2 border rounded bg-gray-100">
                    <h2 className="text-lg font-semibold">API Yanıtı:</h2>
                    <pre className="text-sm">{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
