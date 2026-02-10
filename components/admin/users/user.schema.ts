import { z } from "zod"

export const userInfoSchema = z.object({
  firstName: z.string().min(1, "Prenom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
})

export const userPasswordSchema = z.object({
  password: z.string().min(6, "Mot de passe requis"),
})

export const userRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Role requis",
  }),
})

export const createUserSchema = userInfoSchema.extend({
  password: z.string().min(6, "Mot de passe requis"),
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Role requis",
  }),
})

export const updateUserInfoSchema = userInfoSchema
export const updateUserPasswordSchema = userPasswordSchema
export const updateUserRoleSchema = userRoleSchema
