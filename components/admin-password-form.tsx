"use client"

import { useState, useRef } from "react"
import { updateAdminPassword } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useLocale } from "@/lib/locale-context"

export function AdminPasswordForm() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { t } = useLocale()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await updateAdminPassword(formData)
    setLoading(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success(t("admin.update"))
      formRef.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">{t("admin.password")}</Label>
        <Input 
          id="currentPassword" 
          name="currentPassword" 
          type="password" 
          required 
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">{t("admin.password")} (New)</Label>
        <Input 
          id="newPassword" 
          name="newPassword" 
          type="password" 
          required 
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("admin.password")} (Confirm)</Label>
        <Input 
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          required 
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full cursor-pointer disabled:cursor-not-allowed" variant="secondary">
        {loading ? t("admin.updating") : t("admin.update")}
      </Button>
    </form>
  )
}

