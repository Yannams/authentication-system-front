"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import UserForm from "./UserForm"
import { User } from "./types"

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  isEdit: boolean
  user?: User
}

export default function UserDialog({
  open,
  onOpenChange,
  isEdit,
  user,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier l’utilisateur" : "Créer un utilisateur"}
          </DialogTitle>
        </DialogHeader>

        <UserForm
          isEdit={isEdit}
          defaultValues={user}
          onSubmit={(values) => {
            console.log(values)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
