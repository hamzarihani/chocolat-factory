import { products } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { StorySection } from "@/components/story-section"
import { SiteFooter } from "@/components/site-footer"

export default async function HomePage() {
  const sorted = [...products].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

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

