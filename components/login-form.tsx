"use client"

import { useActionState } from "react"
import { loginAction } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/lib/locale-context"

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const { t } = useLocale()

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary-foreground">
            Maison du Chocolat
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/70 font-serif">
            {t("navigation.admin")} Portal
          </p>
        </div>
        <form action={formAction} className="flex flex-col gap-5 rounded-lg bg-card p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-card-foreground">{t("admin.login_heading")}</h2>

          {state?.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
              {t("admin.email")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@chocolatfactory.com"
              required
              className="bg-background"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
              {t("admin.password")}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="bg-background"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full mt-2 cursor-pointer disabled:cursor-not-allowed">
            {isPending ? t("admin.logging_in") : t("admin.login")}
          </Button>
        </form>
      </div>
    </div>
  )
}

