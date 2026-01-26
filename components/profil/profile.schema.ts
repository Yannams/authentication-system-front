import { z } from "zod"

export const profileSchema = z
  .object({
    firstName: z.string().min(1, "Prénom requis"),
    lastName: z.string().min(1, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6).optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      !data.password || data.password === data.confirmPassword,
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"],
    }
  )
