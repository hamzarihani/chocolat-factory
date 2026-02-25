import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { AdminProfileForm } from "@/components/admin-profile-form"
import { AdminPasswordForm } from "@/components/admin-password-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { adminUser } from "@/lib/db"

export default async function AdminProfilePage() {
  const session = await getSession()
  if (!session) redirect("/admin")

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader adminName={session.name} />
      <main className="mx-auto max-w-2xl px-4 py-8 md:px-8">
        <h1 className="mb-8 text-3xl font-bold">Admin Profile</h1>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your name and email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminProfileForm 
                initialName={adminUser.name} 
                initialEmail={adminUser.email} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Ensure your account is using a long, random password to stay secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminPasswordForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
