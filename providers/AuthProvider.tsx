"use client"

import { ReactNode, useEffect, useMemo, useState } from "react"
import { UserProfile } from "@/components/profil/types"
import { AuthContext } from "@/context/AuthContext"
import {
  authMe,
  login,
  logout,
  refreshToken,
  register,
} from "@/services/auth/auth.service"
import { setAccessToken as setInterceptorAccessToken } from "@/services/interceptor"
import { usePathname } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const isAuthRoute = useMemo(
    () => pathname?.startsWith("/authentication") ?? false,
    [pathname]
  )

  const applyAccessToken = (token: string | null) => {
    setAccessToken(token)
    setInterceptorAccessToken(token)
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await login(email, password)
      setUser(res.data.user)
      applyAccessToken(res.data.accessToken)
      return {
        success: true,
        user: res.data.user,
      }
    } catch (error) {
      return { success: false }
    }
  }

  const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      await register(firstName, lastName, email, password)
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  const logoutUser = async () => {
    try {
      await logout()
      setUser(null)
      applyAccessToken(null)
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshToken()
        applyAccessToken(response.data.accessToken)
        const authMeResponse = await authMe()
        setUser(authMeResponse.data)
        console.log(response);
        
      } catch {
        setUser(null)
        applyAccessToken(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
    
  }, [])

 

  if (loading && !isAuthRoute) return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner className="w-10 h-12"/>
    </div>
  )

  return (
    <AuthContext.Provider
      value={{ user, loading, login: loginUser, logout: logoutUser, register: registerUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
