"use client"
import { UserProfile } from "@/components/profil/types";
import { createContext } from "react";

interface AuthContextType {
    user: UserProfile | null;   
    loading: boolean;
    login: (email: string, password: string) => Promise<{success: boolean, user?:UserProfile}>;
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<{success: boolean}>;
    logout: () => Promise<void>;
}
export const AuthContext=createContext<AuthContextType | null> (null)
