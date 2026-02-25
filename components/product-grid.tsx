"use client"

import type { Product } from "@/lib/db"
import { ProductCard } from "@/components/product-card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

function AnimatedCategory({ category, products }: { category: string; products: Product[] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div ref={ref} className="mb-16 last:mb-0">
      <h3
        className="mb-6 text-2xl font-semibold text-foreground transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
        }}
      >
        {category}
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
            }}
          >
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeader() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div ref={ref} className="mb-14 text-center">
      <p
        className="text-sm font-serif tracking-[0.3em] uppercase text-accent transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        Our Creations
      </p>
      <h2
        className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "150ms",
        }}
      >
        The Collection
      </h2>
      <p
        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground font-serif transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "300ms",
        }}
      >
        Each piece is a testament to our master chocolatiers&apos; dedication
        to perfection, crafted from ethically sourced cacao.
      </p>
    </div>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <section id="collection" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader />
        {categories.map((category) => (
          <AnimatedCategory
            key={category}
            category={category}
            products={products.filter((p) => p.category === category)}
          />
        ))}
      </div>
    </section>
  )
}
