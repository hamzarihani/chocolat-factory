"use client"

import type { Product } from "@/lib/db"
import { ProductCard } from "@/components/product-card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLocale } from "@/lib/locale-context"

export function ProductGrid({ products }: { products: Product[] }) {
  const { t } = useLocale()
  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <section id="collection" className="bg-background px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader />
        {categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            products={products.filter((p) => p.category === category)}
          />
        ))}
      </div>
    </section>
  )
}

function SectionHeader() {
  const { t } = useLocale()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div ref={ref} className="mb-20 text-center">
      <p
        className="text-sm font-serif tracking-[0.3em] uppercase text-accent transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {t("collection.subtitle")}
      </p>
      <h2
        className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "150ms",
        }}
      >
        {t("collection.title")}
      </h2>
      <p
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground font-serif transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "300ms",
        }}
      >
        {t("collection.description")}
      </p>
    </div>
  )
}

function CategorySection({
  category,
  products,
}: {
  category: string
  products: Product[]
}) {
  const { t } = useLocale()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div ref={ref} className="mb-16 last:mb-0">
      <h3
        className="mb-8 border-b border-border pb-2 text-2xl font-bold tracking-tight text-primary transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        }}
      >
        {category}
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${idx * 100}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
