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
import { Skeleton } from "@/components/ui/skeleton"


export default function UserTable() {
  const [openForm, setOpenForm] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editAction, setEditAction] = useState<"info" | "password" | "role">(
    "info"
  )
  const [users, setUsers]=useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const confirmDelete = async (userId :any ) => {
    await deleteUser(userId)
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setOpenDelete(false)
    setSelectedUser(undefined)
  }
  const handleUserCreated = (newUser: User) => {
    setUsers((prev) => {
      if (prev.some((user) => user.id === newUser.id)) return prev
      return [newUser, ...prev]
    })
  }
  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
  }

  useEffect(()=>{
    const setListOfUsers = async () => {
      setIsLoading(true)
      try {
        const res = await getUsers()
        setUsers(res.data)
      } finally {
        setIsLoading(false)
      }
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
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-56" />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Skeleton className="inline-block h-8 w-8" />
                      <Skeleton className="inline-block h-8 w-24" />
                    </TableCell>
                  </TableRow>
                ))
              : users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Actions"
                          >
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
        onUserUpdated={handleUserUpdated}
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
