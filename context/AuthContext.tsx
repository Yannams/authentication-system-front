"use client"
import { UserProfile } from "@/components/profil/types";
import { createContext } from "react";

interface AuthContextType {
    accessToken: string | null;
    user: UserProfile | null;
    login: (email: string, password: string) => Promise<{success: boolean, user?:UserProfile}>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<{success: boolean}>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}
export const AuthContext=createContext<AuthContextType | null> (null)
