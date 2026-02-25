"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logoutAction } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"

export function AdminHeader({ adminName }: { adminName: string }) {
  const pathname = usePathname()
  const isProfilePage = pathname === "/admin/profile"

  return (
    <header className="border-b border-border bg-card px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-foreground">
            Maison du Chocolat
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-accent">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          {!isProfilePage ? (
            <Link 
              href="/admin/profile" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="hidden text-sm text-muted-foreground md:inline-block">
                {adminName}
              </span>
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                {adminName.substring(0, 1).toUpperCase()}
              </div>
            </Link>
          ) : (
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Dashboard
              </Button>
            </Link>
          )}
          <form action={logoutAction}>
            <Button variant="outline" size="sm" type="submit" className="cursor-pointer">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
