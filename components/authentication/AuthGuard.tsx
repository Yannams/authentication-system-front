"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import  { ReactNode, useEffect } from "react"

export default function AuthGuard({ children }:{children:ReactNode}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/authentication/login")
    }
  }, [user, loading, router])

  if (loading) return null
  if (!user) return null

  return children
}
