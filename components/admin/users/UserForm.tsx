"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  createUserSchema,
  updateUserInfoSchema,
  updateUserPasswordSchema,
  updateUserRoleSchema,
} from "./user.schema"
import { User } from "./types"

type UserFormMode = "create" | "info" | "password" | "role"

interface Props {
  mode: UserFormMode
  defaultValues?: Partial<User>
  onSubmit: (values: any) => void
}

const schemaMap = {
  create: createUserSchema,
  info: updateUserInfoSchema,
  password: updateUserPasswordSchema,
  role: updateUserRoleSchema,
}

const submitLabelMap: Record<UserFormMode, string> = {
  create: "Creer l'utilisateur",
  info: "Mettre a jour les infos",
  password: "Mettre a jour le mot de passe",
  role: "Mettre a jour le role",
}

export default function UserForm({ mode, defaultValues, onSubmit }: Props) {
  const form = useForm({
    resolver: zodResolver(schemaMap[mode]),
    defaultValues: {
      ...(mode === "create" || mode === "info"
        ? { firstName: "", lastName: "", email: "" }
        : {}),
      ...(mode === "create" || mode === "password" ? { password: "" } : {}),
      ...(mode === "create" || mode === "role" ? { role: "USER" } : {}),
      ...defaultValues,
    },
  })

  const showInfoFields = mode === "create" || mode === "info"
  const showPasswordField = mode === "create" || mode === "password"
  const showRoleField = mode === "create" || mode === "role"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {showInfoFields && (
          <>
            {["firstName", "lastName", "email"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as any}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>
                      {field === "firstName"
                        ? "Prenom"
                        : field === "lastName"
                        ? "Nom"
                        : "Email"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={field === "email" ? "email" : "text"}
                        {...f}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </>
        )}

        {showPasswordField && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showRoleField && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisir un role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">
          {submitLabelMap[mode]}
        </Button>
      </form>
    </Form>
  )
}
