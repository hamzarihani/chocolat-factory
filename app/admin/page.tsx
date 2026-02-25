import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session) redirect("/admin/dashboard")

  return <LoginForm />
}


