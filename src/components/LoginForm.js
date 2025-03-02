"use client";  // ✅ Client-side bileşen olduğunu belirtiyoruz.

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiclient"; // ✅ API istekleri için apiClient
import { useAuth } from "@/context/AuthContext"; // ✅ Kullanıcı durumu için AuthContext

export default function LoginForm() {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    useEffect(() => {
        console.log("Login sayfası yüklendi.");
    }, []);

    // Kullanıcının inputları doldurmasını takip eder
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // API'ye login isteği gönderme fonksiyonu
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Giriş verileri:", formData);
        
        try {
            const response = await apiClient.post("/api/login/", formData);

            if (response.data?.access_token) {
                console.log("Giriş başarılı:", response.data);
                toast.success("Giriş başarılı! Hoş geldiniz 👋");

                // Kullanıcının "Beni Hatırla" seçeneğine göre token'ı saklama
                const storage = formData.rememberMe ? localStorage : sessionStorage;
                storage.setItem("access_token", response.data.access_token);
                storage.setItem("refresh_token", response.data.refresh_token);

                setIsAuthenticated(true);
                router.push("/profile"); // Kullanıcıyı yönlendir
            } else {
                throw new Error("Geçersiz yanıt! Token bulunamadı.");
            }
        } catch (error) {
            console.error("Giriş hatası:", error);
            toast.error(error.response?.data?.message || "Giriş başarısız!");
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-white text-2xl font-semibold mb-6 text-center">Giriş Yap</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-white mb-2">Kullanıcı Adı</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Kullanıcı Adı"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2">Şifre</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Şifre"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="mr-2"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />
                    <label htmlFor="rememberMe" className="text-white">Beni hatırla</label>
                </div>

                {/* Kayıt ol ve Şifreyi unuttum linkleri */}
                <div className="mb-4 text-right">
                    <Link href="/register" className="text-blue-400 hover:underline">
                        Henüz bir hesabın yok mu? Kayıt Ol
                    </Link>
                </div>

                <div className="mb-4 text-right">
                    <Link href="/reset-password" className="text-blue-400 hover:underline">
                        Şifremi Unuttum
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}
