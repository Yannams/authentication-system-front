"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>Bonjour {user ? user.firstName : "Invite"}!</div>
    </div>
  );
}
