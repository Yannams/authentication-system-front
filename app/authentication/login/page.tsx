"use client"
import AuthForm from "@/components/authentication/AuthForm";
import AuthLayout from "@/components/authentication/AuthLayout";

export default function Login(){
    return(
    <AuthLayout title="Connexion">
        <AuthForm
          type="login"
        />
      </AuthLayout>
    )
}