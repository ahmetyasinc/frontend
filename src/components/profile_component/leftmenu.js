"use client"; // React client component olarak çalışmasını sağlar
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/css/leftmenu.css"; // Kendi stil dosyanı import et
import "../../styles/css/logOut_modal.css"; // Kendi stil dosyanı import et
import { RiBtcLine } from "react-icons/ri";
import { FaChessBishop } from "react-icons/fa";
import { BiUser, BiCandles, BiLineChart, BiBroadcast, BiSearchAlt, BiGroup, BiLogOut, BiMenu, BiChevronLeft } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { LuBot } from "react-icons/lu";
import { useLogout } from "@/utils/HookLogout"; // Logout fonksiyonunu içe aktar

const LeftMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false); // Sidebar açık mı?
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Çıkış modalı açık mı?
    const pathname = usePathname(); // Mevcut URL'yi alır
    const handleLogout = useLogout(); // useLogout hook'unu çağır

    const menuItems = [
        { href: "/profile", icon: <BiUser />, label: "Profil" },
        { href: "/profile/coins", icon: <RiBtcLine />, label: "Kripto varlıklar" }, // Bitcoin ikonu
        { href: "/profile/indicators", icon: <BiCandles />, label: "İndikatörler" },
        { href: "/profile/strategies", icon: <FaChessBishop />, label: "Stratejilerim" }, // Satranç taşı
        { href: "/profile/backtest", icon: <BiLineChart />, label: "Backtest" },
        { href: "/profile/apiconnect", icon: <BiBroadcast />, label: "API Bağlantısı" },
        { href: "/profile/bot", icon: <LuBot />, label: "Otomatik Botlarım" },
        { href: "/profile/sift", icon: <BiSearchAlt />, label: "Strateji Tarama" },
        { href: "/profile/community", icon: <BiGroup />, label: "Topluluk" },
    ];

    // Sidebar açılış ve kapanış animasyonları
    useEffect(() => {
        const toggleBtn = document.getElementById("toggleSidebar-left");
        if (toggleBtn) {
            if (isOpen) {
                toggleBtn.classList.add("move-left");
            } else {
                toggleBtn.classList.remove("move-left");
            }
        }
    }, [isOpen]);
    
    
    return (
        <div className={`sidebar-left ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header-left">
                <img src="/img/user.jpg" alt="Profil Fotoğrafı" className="profile-img" />
                {isOpen && <h5 className="username-left">{user?.fullName}</h5>}
            </div>
            <ul className="sidebar-links-left space-y-0">
                {menuItems.map((item, index) => (
                    <li key={index} className="relative flex items-center">
                    <Link
                        href={item.href}
                        className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
                    >
                        {pathname === item.href && (
                            <IoMdArrowDropright className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 text-2xl text-white" />
                        )}
                        <span className="menu-icon">{item.icon}</span>
                        {isOpen && <span className="link-label">{item.label}</span>}
                    </Link>
                </li>
                ))}
                {/* Çıkış Yap Butonu */}
                <li className="sidebar-link-item">
                    <button className="logout-button" onClick={() => setShowLogoutModal(true)}>
                        <span className="menu-icon"><BiLogOut /></span>
                        {isOpen && <span className="link-label">Çıkış Yap</span>}
                    </button>
                </li>
            </ul>

            {/* Toggle Butonu */}
            <button
                id="toggleSidebar-left"
                className="toggle-btn-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <BiChevronLeft size={26} /> : <BiMenu size={26} />}
            </button>

            {/* Çıkış Onay Modalı */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="logout-modal-content">
                        <IoWarningOutline />
                        <p>Çıkış yapmak istediğinize emin misiniz?</p>
                        <div className="logout-modal-buttons">
                            <button onClick={() => setShowLogoutModal(false)} className="cancel-btn">Hayır</button>
                            <button onClick={handleLogout} className="confirm-btn">Çıkış Yap</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeftMenu;
