"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ isAuthenticated: false, setIsAuthenticated: () => {} });

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        setIsAuthenticated(!!token); // Token varsa true, yoksa false olarak ayarla
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
