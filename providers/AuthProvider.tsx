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
import { usePathname, useRouter } from "next/navigation"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const isAuthRoute = useMemo(
    () => pathname?.startsWith("/authentication"),
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
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      await register(email, password, firstName, lastName)
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
      } catch {
        setUser(null)
        applyAccessToken(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
    
  }, [])

  useEffect(() => {
    if (!loading && !accessToken && !isAuthRoute) {
      router.push("/authentication/login")
    }
  }, [accessToken, isAuthRoute, loading, router])

  useEffect(()=>{
    console.log(accessToken);   
    console.log(user);
    
    
  },[accessToken, user])

  if(loading) return null

  return (
    <AuthContext.Provider
      value={{ user, login: loginUser, logout: logoutUser, register: registerUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
