"use client"

import { useState } from "react"
import { updateAdminProfile } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function AdminProfileForm({ 
  initialName, 
  initialEmail 
}: { 
  initialName: string
  initialEmail: string 
}) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await updateAdminProfile(formData)
    setLoading(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Profile updated successfully")
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={initialName} 
          required 
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          defaultValue={initialEmail} 
          required 
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full cursor-pointer disabled:cursor-not-allowed">
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  )
}
