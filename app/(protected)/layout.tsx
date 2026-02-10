"use client"

import type { ReactNode } from "react"
import AuthGuard from "@/components/authentication/AuthGuard"

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  console.log('auth');
  
  return <AuthGuard>{children}</AuthGuard>
}
