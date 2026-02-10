"use client"
import AuthForm from "@/components/authentication/AuthForm";
import AuthLayout from "@/components/authentication/AuthLayout";

export default function ResetPassword() {
  return (
    <AuthLayout title="Réinitialiser le mot de passe">
      <AuthForm type="resetpassword" />
    </AuthLayout>
  );
}
