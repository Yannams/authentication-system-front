import { z } from "zod"

export const baseUserSchema = {
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe requis"),
}

export const createUserSchema = z.object({
  ...baseUserSchema,
})

export const updateUserSchema = z.object({
  ...baseUserSchema,
  password: z.string().min(6).optional(),
})
