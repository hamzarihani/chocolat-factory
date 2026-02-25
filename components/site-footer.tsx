"use client"

import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function SiteFooter() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <footer ref={ref} className="border-t border-border bg-card px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <Link
          href="/"
          className="text-xl font-bold text-foreground transition-all duration-300 hover:scale-105 hover:text-accent"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out, color 0.3s, scale 0.3s",
          }}
        >
          Maison du Chocolat
        </Link>
        <p
          className="max-w-md text-sm leading-relaxed text-muted-foreground font-serif"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
          }}
        >
          Handcrafted with passion since 1897. Every piece tells a story of
          dedication, tradition, and the finest ingredients.
        </p>
        <div
          className="flex items-center gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
          }}
        >
          <Link href="#collection" className="text-sm text-muted-foreground transition-all duration-300 hover:text-accent hover:tracking-wider">
            Collection
          </Link>
          <Link href="#story" className="text-sm text-muted-foreground transition-all duration-300 hover:text-accent hover:tracking-wider">
            Our Story
          </Link>
          <Link href="/admin" className="text-sm text-muted-foreground transition-all duration-300 hover:text-accent hover:tracking-wider">
            Admin
          </Link>
        </div>
        <p
          className="text-xs text-muted-foreground"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.45s",
          }}
        >
          &copy; {new Date().getFullYear()} Maison du Chocolat. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
