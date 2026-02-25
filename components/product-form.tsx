"use client"

import { useState, useTransition, useRef, useCallback } from "react"
import Image from "next/image"
import type { Product } from "@/lib/db"
import { createProduct, updateProduct, deleteProduct } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

type ProductFormProps = {
  product?: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductForm({ product, open, onOpenChange }: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentImage = imageUrl ?? product?.image_url ?? null

  const handleFileUpload = useCallback(async (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Use JPG, PNG, WebP, or GIF.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        setImageUrl(data.url)
      }
    } catch {
      toast.error("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileUpload(file)
    },
    [handleFileUpload]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFileUpload(file)
    },
    [handleFileUpload]
  )

  const handleSubmit = (formData: FormData) => {
    if (currentImage) {
      formData.set("image_url", currentImage)
    }
    startTransition(async () => {
      const result = product
        ? await updateProduct(product.id, formData)
        : await createProduct(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(product ? "Product updated" : "Product created")
        setImageUrl(null)
        onOpenChange(false)
      }
    })
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) setImageUrl(null)
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "New Product"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={product?.name ?? ""}
              required
              placeholder="Dark Velvet Truffle"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description ?? ""}
              rows={3}
              placeholder="Describe this chocolate creation..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price (TND)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={product?.price ?? ""}
                required
                placeholder="12.99"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={product?.category ?? ""}
                required
                placeholder="Truffles, Bonbons, Bars..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Product Image</Label>
            <div
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors duration-200 cursor-pointer ${
                dragOver
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/50 hover:bg-muted/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
              }}
              aria-label="Upload product image"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="sr-only"
                aria-hidden="true"
              />
              {currentImage ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-border">
                    <Image
                      src={currentImage}
                      alt="Product preview"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, WebP or GIF (max 5MB)
                  </p>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
              )}
            </div>
            {currentImage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-start text-xs text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  setImageUrl("")
                }}
              >
                Remove image
              </Button>
            )}
            <input type="hidden" name="image_url" value={currentImage ?? ""} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              defaultChecked={product?.featured ?? false}
              className="h-4 w-4 rounded border-border accent-accent"
            />
            <Label htmlFor="featured" className="text-sm font-normal">
              Featured product
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || uploading}>
              {isPending ? "Saving..." : product ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteButton({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this product?")) return
    startTransition(async () => {
      await deleteProduct(productId)
      toast.success("Product deleted")
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className="text-destructive cursor-pointer hover:bg-destructive/10 hover:text-destructive"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  )
}
