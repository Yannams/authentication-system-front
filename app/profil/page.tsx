"use client"

import ProfileCard from "@/components/profil/ProfileCard"
import ProfileForm from "@/components/profil/ProfileForm"
import { UserProfile } from "@/components/profil/types"

const mockUser: UserProfile = {
  id: 1,
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean@test.com",
}

export default function ProfilePage() {
  const handleSubmit = (values: any) => {
    console.log("UPDATE PROFILE", values)
    // Appel API ici
  }

  return (
    <div className="py-10 px-4">
      <ProfileCard>
        <ProfileForm user={mockUser} onSubmit={handleSubmit} />
      </ProfileCard>
    </div>
  )
}
