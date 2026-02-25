"use client"

import Image from "next/image"
import type { Product } from "@/lib/db"
import { useLocale } from "@/lib/locale-context"

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLocale()
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground uppercase tracking-widest text-xs">
            {t("collection.noImage")}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_50/0.4)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-transform duration-300 group-hover:scale-110">
            {t("collection.featured")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-card-foreground transition-colors duration-300 group-hover:text-accent">{product.name}</h3>
          <span className="shrink-0 text-lg font-bold text-accent">
            {Number(product.price).toFixed(2)}€
          </span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        {product.description && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground font-serif line-clamp-3">
            {product.description}
          </p>
        )}
      </div>
    </div>
  )
}
