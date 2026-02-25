import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { products } from "@/lib/db"
import { AdminHeader } from "@/components/admin-header"
import { ProductTable } from "@/components/product-table"

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session) redirect("/admin")

  const sorted = [...products].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader adminName={session.name} />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <ProductTable products={sorted} />
      </main>
    </div>
  )
}
