"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./Schema"

import { AuthFormType } from "./Types"
import { forgotPassword, resetPassword } from "@/services/auth/auth.service"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"




// stocker access token + user



const schemaMap = {
  login: loginSchema,
  register: registerSchema,
  "forgot-password": forgotPasswordSchema,
  resetpassword: resetPasswordSchema,
}

export default function AuthForm({ type }: { type: AuthFormType }) {
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const {login, register} = useAuth()
   
  const form = useForm({
    resolver: zodResolver(schemaMap[type]),
    defaultValues: {
      email: "",
      password: "",
      token: "",
      firstName: "",
      lastName: "",
    },
  })

  const router = useRouter();

  async function onSubmit (values: any) {
    setMessage(null); // reset message

    // 🔐 LOGIN
    if (type === "login") {
      const response =  await login(values.email, values.password)
      if (response.success) {
        console.log(response.user);
        
        if (response.user?.role === "ADMIN") {
          router.push("/admin/users");
        } else {
          router.push("/");
        }
      }else {
        setMessage({
          type: "error",
          text: "Email ou mot de passe incorrect. Veuillez réessayer.",
        })
      }
      return
    }

  
    // 📝 REGISTER (placeholder)
    if (type === "register") {
      try {
        await register(values.firstName, values.lastName, values.email, values.password)
        setMessage({
          type: "success",
          text: "Compte créé avec succès. Vous recevrez un lien de verification par email sous peu.",
        })
      } catch (error) {
        setMessage({
          type: "error",
          text: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        })
      }
      
    }

    
    // 🔁 FORGOT PASSWORD
    if (type === "forgot-password") {
      await forgotPassword(values.email)
      setMessage({
        type: "success",
        text:
          "Si l’email est correct, vous recevrez un message pour réinitialiser votre mot de passe.",
      })
      return
    }

      // 🔁 RESET PASSWORD (placeholder)
      if (type === "resetpassword") {
        try {
          await resetPassword(values.token, values.password)
          setMessage({
            type: "success",
            text: "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
          })
          router.push("/authentication/login")
        } catch (error) {
          setMessage({
            type: "error",
            text: "Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer.",
          })
        }
      }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Message global */}
        {message && (
          <div
            className={`rounded-md p-3 text-sm ${
              message.type === "error"
                ? "bg-destructive/10 text-destructive"
                : "bg-green-500/10 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Register fields */}
        {type === "register" && (
          <>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {type !== "resetpassword" && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(type === "resetpassword" ) && (
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jeton de réinitialisation</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}


        {/* Password */}
        {(type !== "forgot-password" ) && (
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

        {/* Forgot password link */}
        {type === "login" && (
          <div className="text-right">
            <Link
              href="/authentication/forgot-password"
              className="text-sm text-muted-foreground hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
          aria-busy={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <span
              className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
          )}
          {type === "login" && "Se connecter"}
          {type === "register" && "Créer un compte"}
          {type === "forgot-password" && "Envoyer le lien"}
          {type === "resetpassword" && "Reinitialiser le mot de passe"}
        </Button>

        {/* Footer links */}
        <div className="text-center text-sm text-muted-foreground">
          {type === "login" && (
            <>
              Pas encore de compte?{" "}
              <Link
                href="/authentication/register"
                className="font-medium text-primary hover:underline"
              >
                S’inscrire
              </Link>
            </>
          )}

          {type === "register" && (
            <>
              Déjà un compte?{" "}
              <Link
                href="/authentication/login"
                className="font-medium text-primary hover:underline"
              >
                Se connecter
              </Link>
            </>
          )}

          {type === "forgot-password" && (
            <Link
              href="/authentication/login"
              className="font-medium text-primary hover:underline"
            >
              Retour à la connexion
            </Link>
          )}
        </div>
      </form>
    </Form>
  )
}
