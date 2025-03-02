"use client";  // ✅ Bu bileşen artık client-side çalışacak

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import apiClient from "@/utils/apiclient"; // ✅ API istekleri için apiClient
import { useAuth } from "@/context/AuthContext"; // ✅ AuthContext burada kullanılabilir

export default function RegisterForm() {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        firstName: "", 
        lastName: "",  
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        console.log("Register sayfası yüklendi.");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Kayıt verileri:", formData);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Şifreler uyuşmuyor!");
            return;
        }

        try {
            const response = await apiClient.post("/api/register/", formData);
            console.log(response);
            
            if (response.data?.message === "User created successfully") {
                toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");

                setTimeout(() => {
                    router.push("/login"); // ✅ Kullanıcıyı giriş sayfasına yönlendiriyoruz
                }, 2000);
            } else {
                throw new Error(response.data?.message || "Kayıt başarısız!");
            }
        } catch (error) {
            console.error("Kayıt hatası:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Kayıt başarısız!");
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-white text-2xl font-semibold mb-6 text-center">Kayıt Ol</h3>
    
            <form onSubmit={handleSubmit}>
                {/* İsim ve Soyisim - Küçük ve Yan Yana */}
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="firstName" className="block text-white text-sm mb-1">İsim</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="İsim"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 text-sm"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="lastName" className="block text-white text-sm mb-1">Soyisim</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Soyisim"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 text-sm"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
    
                {/* Kullanıcı Adı */}
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
                    />
                </div>
    
                {/* E-Posta */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2">E-Posta</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-Posta"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
    
                {/* Şifre */}
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
                    />
                </div>
    
                {/* Şifreyi Onayla */}
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-white mb-2">Şifreyi Onayla</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Şifreyi Tekrar Girin"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
    
                {/* Zaten hesabın var mı? */}
                <div className="mb-4 text-right">
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Zaten bir hesabın var mı? Giriş Yap
                    </Link>
                </div>
    
                {/* Kayıt Ol Butonu */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                    Kayıt Ol
                </button>
            </form>
        </div>
    );
    
}
