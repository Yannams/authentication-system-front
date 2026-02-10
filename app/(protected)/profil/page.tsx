"use client"

import ProfileCard from "@/components/profil/ProfileCard"
import ProfileForm from "@/components/profil/ProfileForm"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useAuth } from "@/hooks/useAuth"
import { UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"


export default function ProfilePage() {
  const { user } = useAuth()
  const  router = useRouter()

  if (!user) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UserCircle className="w-15 h-15" />
              </EmptyMedia>
              <EmptyTitle>No User</EmptyTitle>
              <EmptyDescription>No data found</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={()=>router.push('/authentication/login')}>Login</Button>
            </EmptyContent>
          </Empty>
      </div>
   
    )
  }

  const profileEdit = async() => {

  }
  const handleSubmit = (values: any) => {
    console.log("UPDATE PROFILE", values)
  }

  return (
    <div className="py-10 px-4">
      <ProfileCard>
        <ProfileForm user={user} onSubmit={handleSubmit} />
      </ProfileCard>
    </div>
  )
}
