"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { LogOut, UserCircle } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function AppHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname?.startsWith("/authentication")) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push("/authentication/login")
  }

  return (
    <div className="bg-zinc-50 font-sans dark:bg-black p-3 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserCircle />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{user ? user.firstName : "Invite"}</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href="/profil">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout <LogOut />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
