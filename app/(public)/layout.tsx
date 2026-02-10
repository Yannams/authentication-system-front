"use client"

import type { ReactNode } from "react"
import GuestGuard from "@/components/authentication/GuestGuard"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>
}
