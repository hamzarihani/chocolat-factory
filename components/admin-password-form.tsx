"use client"

import { useState, useRef } from "react"
import { updateAdminPassword } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function AdminPasswordForm() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await updateAdminPassword(formData)
    setLoading(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Password changed successfully")
      formRef.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input 
          id="currentPassword" 
          name="currentPassword" 
          type="password" 
          required 
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input 
          id="newPassword" 
          name="newPassword" 
          type="password" 
          required 
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input 
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          required 
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full cursor-pointer disabled:cursor-not-allowed" variant="secondary">
        {loading ? "Changing..." : "Change Password"}
      </Button>
    </form>
  )
}
