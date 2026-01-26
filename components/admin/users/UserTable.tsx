"use client"

import { useState } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import UserDialog from "./UserDialog"
import DeleteDialog from "./DeleteDialog"
import { User } from "./types"

const mockUsers: User[] = [
  { id: 1, firstName: "Jean", lastName: "Dupont", email: "jean@test.com" },
  { id: 2, firstName: "Jeanne", lastName: "Dupont", email: "jeanne@test.com" },
]

export default function UserTable() {
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            setIsEdit(false)
            setSelectedUser(undefined)
            setOpenForm(true)
          }}
        >
          Créer
        </Button>
      </div>

      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEdit(true)
                      setSelectedUser(user)
                      setOpenForm(true)
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setOpenDelete(true)
                    }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDialog
        open={openForm}
        onOpenChange={setOpenForm}
        isEdit={isEdit}
        user={selectedUser}
      />

      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={() => {
          console.log("Suppression de", selectedUser)
        }}
      />
    </>
  )
}
