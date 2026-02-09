"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth/auth.service";
import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
 
  const {user} = useAuth() 

  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (response.data.message === "Logged out successfully") {
      router.push("/login");
    }
  };

  return (
    <>

    <div className="bg-zinc-50 font-sans dark:bg-black p-3 flex justify-end" >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserCircle/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{user ? user.firstName : "Invité"}</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/profil">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout <LogOut/></DropdownMenuItem>
          </DropdownMenuGroup>
         
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        Bonjour {user ? user.firstName : "Invité"}! 
      </div>
    </div>
    </>
    
  );
}
