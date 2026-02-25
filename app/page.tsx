import { products } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { StorySection } from "@/components/story-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  const sorted = [...products].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <ProductGrid products={sorted} />
      <StorySection />
      <SiteFooter />
    </main>
  )
}
