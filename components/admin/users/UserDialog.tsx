"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import UserForm from "./UserForm"
import { User } from "./types"
import {
  createUser,
  updateUserInfo,
  updateUserPassword,
  updateUserRole,
} from "@/services/admin/users/users.service"

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  isEdit: boolean
  user?: User
  editAction?: "info" | "password" | "role"
  onUserCreated?: (user: User) => void
  onUserUpdated?: (user: User) => void
}

export default function UserDialog({
  open,
  onOpenChange,
  isEdit,
  user,
  editAction = "info",
  onUserCreated,
  onUserUpdated,
}: Props) {
  const userId = user?.id

  const handleCreate = async (values: any) => {
    const response = await createUser(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      values.role
    )
    const newUser = response.data
    if (newUser && onUserCreated) {
      onUserCreated(newUser)
    }
    onOpenChange(false)
  }

  const handleUpdateInfo = async (values: any) => {
    if (!userId) return
    const response = await updateUserInfo(
      userId,
      values.firstName,
      values.lastName,
      values.email
    )
    const updatedUser = response.data ?? {
      ...user,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    }
    if (updatedUser && onUserUpdated) {
      onUserUpdated(updatedUser)
    }
    onOpenChange(false)
  }

  const handleUpdatePassword = async (values: any) => {
    if (!userId) return
    await updateUserPassword(userId, values.password)
    onOpenChange(false)
  }

  const handleUpdateRole = async (values: any) => {
    if (!userId) return
    const response = await updateUserRole(userId, values.role)
    const updatedUser = response.data ?? {
      ...user,
      role: values.role,
    }
    if (updatedUser && onUserUpdated) {
      onUserUpdated(updatedUser)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier l'utilisateur" : "Creer un utilisateur"}
          </DialogTitle>
        </DialogHeader>

        {!isEdit && (
          <UserForm mode="create" defaultValues={user} onSubmit={handleCreate} />
        )}

        {isEdit && (
          <>
            {editAction === "info" && (
              <UserForm
                mode="info"
                defaultValues={user}
                onSubmit={handleUpdateInfo}
              />
            )}

            {editAction === "password" && (
              <UserForm mode="password" onSubmit={handleUpdatePassword} />
            )}

            {editAction === "role" && (
              <UserForm
                mode="role"
                defaultValues={{ role: user?.role ?? "USER" }}
                onSubmit={handleUpdateRole}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
