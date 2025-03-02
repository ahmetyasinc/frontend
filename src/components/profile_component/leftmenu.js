"use client"; // React client component olarak çalışmasını sağlar
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/css/leftmenu.css"; // Kendi stil dosyanı import et
import "../../styles/css/logOut_modal.css"; // Kendi stil dosyanı import et
import { RiBtcLine } from "react-icons/ri";
import { FaChessPawn } from "react-icons/fa"; // Satranç taşı
import { BiUser, BiCandles, BiBroadcast, BiAnchor, BiSearchAlt, BiGroup, BiLogOut, BiMenu, BiChevronLeft } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs"; // Alternatif bir grafik ikonu

const LeftMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false); // Sidebar açık mı?
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Çıkış modalı açık mı?
    const pathname = usePathname(); // Mevcut URL'yi alır

    const menuItems = [
        { href: "/profile", icon: <BiUser />, label: "Profil" },
        { href: "/profile/coins", icon: <RiBtcLine />, label: "Kripto varlıklar" }, // Bitcoin ikonu
        { href: "/profile/indicators", icon: <BiCandles />, label: "İndikatörler" },
        { href: "/profile/strategies", icon: <FaChessPawn />, label: "Stratejilerim" }, // Satranç taşı
        { href: "/profile/backtest", icon: <BsGraphUp />, label: "Backtest" },
        { href: "/profile/apiconnect", icon: <BiBroadcast />, label: "API Bağlantısı" },
        { href: "/profile/bot", icon: <BiAnchor />, label: "Otomatik Botlarım" },
        { href: "/profile/sift", icon: <BiSearchAlt />, label: "Strateji Tarama" },
        { href: "/profile/community", icon: <BiGroup />, label: "Topluluk" },
    ];

    const handleLogout = () => {
        console.log("Çıkış yapıldı!"); 
    
        // LocalStorage ve SessionStorage'dan tokenleri temizle
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
    
        setShowLogoutModal(false); // Pop-up'ı kapat
    
        setTimeout(() => {
            window.location.href = "http://localhost:3000/"; // Anasayfaya yönlendir
        }, 300);
    };
    

    useEffect(() => {
        const toggleBtn = document.getElementById("toggleSidebar-left");

        const toggleSidebar = () => {
            setIsOpen(prev => !prev);

            if (!isOpen) {
                toggleBtn.classList.add("move-left"); // Butonu sola kaydır
            } else {
                toggleBtn.classList.remove("move-left"); // Butonu eski yerine getir
            }
        };

        if (toggleBtn) {
            toggleBtn.addEventListener("click", toggleSidebar);
        }

        return () => {
            if (toggleBtn) {
                toggleBtn.removeEventListener("click", toggleSidebar);
            }
        };
    }, [isOpen]);

    return (
        <div className={`sidebar-left ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header-left">
                <img src="/img/user.jpg" alt="Profil Fotoğrafı" className="profile-img" />
                {isOpen && <h5 className="username-left">{user?.fullName}</h5>}
            </div>
            <ul className="sidebar-links-left">
                {menuItems.map((item, index) => (
                    <li key={index} className="sidebar-link-item">
                        <Link
                            href={item.href}
                            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
                        >
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
