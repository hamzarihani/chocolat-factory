"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/db"
import { ProductForm, DeleteButton } from "@/components/product-form"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ProductTable({ products }: { products: Product[] }) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setFormOpen(true)
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground font-serif">
            {products.length} product{products.length !== 1 && "s"} in catalog
          </p>
        </div>
        <Button onClick={handleCreate} className="cursor-pointer">Add Product</Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded bg-muted">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        --
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">{product.name}</p>
                    {product.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {product.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {Number(product.price).toFixed(2)} TND
                </TableCell>
                <TableCell className="text-center">
                  {product.featured ? (
                    <Badge className="bg-accent text-accent-foreground">Yes</Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">No</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <DeleteButton productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No products yet. Click &quot;Add Product&quot; to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ProductForm
        product={editingProduct}
        open={formOpen}
        onOpenChange={setFormOpen}
      />
    </>
  )
}
