"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserDialog from "./UserDialog"
import DeleteDialog from "./DeleteDialog"
import { User } from "./types"
import { deleteUser, getUsers } from "@/services/admin/users/users.service"
import { MoreHorizontal } from "lucide-react"


export default function UserTable() {
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editAction, setEditAction] = useState<"info" | "password" | "role">(
    "info"
  )
  const [users, setUsers]=useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const confirmDelete = async (userId :any ) => {
    const res = await deleteUser(userId)
  }
  const handleUserCreated = (newUser: User) => {
    setUsers((prev) => {
      if (prev.some((user) => user.id === newUser.id)) return prev
      return [newUser, ...prev]
    })
  }

  useEffect(()=>{
    const setListOfUsers = async () => {
      const res = await getUsers()
      setUsers(res.data)
    } 
    setListOfUsers()
  },[])  



  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6">
            Gestion des utilisateurs
        </h1>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" aria-label="Actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEdit(true)
                          setEditAction("info")
                          setSelectedUser(user)
                          setOpenForm(true)
                        }}
                      >
                        Modifier les infos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEdit(true)
                          setEditAction("password")
                          setSelectedUser(user)
                          setOpenForm(true)
                        }}
                      >
                        Modifier le mot de passe
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEdit(true)
                          setEditAction("role")
                          setSelectedUser(user)
                          setOpenForm(true)
                        }}
                      >
                        Modifier le role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
        editAction={editAction}
        onUserCreated={handleUserCreated}
      />

      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={() => {
          if (!selectedUser) return
          confirmDelete(selectedUser.id)
        }}
      />

    </>
  )
}
