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

import { createUserSchema, updateUserSchema } from "./user.schema"
import { User } from "./types"

interface Props {
  isEdit: boolean
  defaultValues?: Partial<User>
  onSubmit: (values: any) => void
}

export default function UserForm({
  isEdit,
  defaultValues,
  onSubmit,
}: Props) {
  const form = useForm({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {["firstName", "lastName", "email", "password"].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as any}
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>
                  {field === "firstName"
                    ? "Prénom"
                    : field === "lastName"
                    ? "Nom"
                    : field === "email"
                    ? "Email"
                    : "Mot de passe"}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field === "password" ? "password" : "text"}
                    {...f}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          {isEdit ? "Mettre à jour" : "Créer l’utilisateur"}
        </Button>
      </form>
    </Form>
  )
}
