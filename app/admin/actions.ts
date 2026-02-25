"use server"

import { login, logout } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { products, type Product } from "@/lib/db"

export async function loginAction(_prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await login(email, password)
  if (!user) {
    return { error: "Invalid email or password" }
  }

  redirect("/admin/dashboard")
}

export async function logoutAction() {
  await logout()
  redirect("/admin")
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const image_url = formData.get("image_url") as string
  const featured = formData.get("featured") === "on"

  if (!name || !price || !category) {
    return { error: "Name, price, and category are required" }
  }

  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0)
  const now = new Date().toISOString()

  products.push({
    id: maxId + 1,
    name,
    description: description || null,
    price,
    category,
    image_url: image_url || null,
    featured,
    created_at: now,
    updated_at: now,
  })

  revalidatePath("/admin/dashboard")
  revalidatePath("/")
  return { success: true }
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const image_url = formData.get("image_url") as string
  const featured = formData.get("featured") === "on"

  if (!name || !price || !category) {
    return { error: "Name, price, and category are required" }
  }

  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return { error: "Product not found" }

  products[index] = {
    ...products[index],
    name,
    description: description || null,
    price,
    category,
    image_url: image_url || null,
    featured,
    updated_at: new Date().toISOString(),
  }

  revalidatePath("/admin/dashboard")
  revalidatePath("/")
  return { success: true }
}

export async function deleteProduct(id: number) {
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) products.splice(index, 1)

  revalidatePath("/admin/dashboard")
  revalidatePath("/")
  return { success: true }
}

export async function updateAdminProfile(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return { error: "Name and email are required" }
  }

  const { adminUser } = await import("@/lib/db")
  adminUser.name = name
  adminUser.email = email

  revalidatePath("/admin/dashboard")
  revalidatePath("/admin/profile")
  return { success: true }
}

export async function updateAdminPassword(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All password fields are required" }
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" }
  }

  const { adminUser } = await import("@/lib/db")
  
  if (currentPassword !== adminUser.password) {
    return { error: "Incorrect current password" }
  }

  adminUser.password = newPassword

  return { success: true }
}
