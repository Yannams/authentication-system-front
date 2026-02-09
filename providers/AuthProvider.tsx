"use client"
import { UserProfile } from "@/components/profil/types";
import { ReactNode, useEffect, useState } from "react";
import { login, logout, refreshToken, register } from "@/services/auth/auth.service";
import { AuthContext } from "@/context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    try {
        const res = await login(email, password)
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        return {
            success: true,
            user: res.data.user
        };
    } catch (error) {
        return {success: false};
    }
  }

  const registerUser = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        await register(email, password, firstName, lastName)
        return {success: true};
    } catch (error) {
        return {success: false};
    }
}

  const logoutUser = async() => {
    try {      
        await logout();
        setUser(null);
        setAccessToken(null);
    }catch (error) {      
        console.error("Logout failed", error);
    }
  }

    const refreshTokenUser = async() => {
        try {
            const res = await refreshToken();
            setAccessToken(res.data.accessToken);
        } catch (error) {
            console.error("Failed to refresh token", error);
        }
    }

    useEffect(() => {
        console.log("User:", user);
        console.log("Access Token:", accessToken);
    }, [user, accessToken]);
        
    return (
        <AuthContext.Provider value={{ user, accessToken, login: loginUser, logout: logoutUser, refreshToken: refreshTokenUser , register: registerUser }}>
            {children}
        </AuthContext.Provider>
    );
}