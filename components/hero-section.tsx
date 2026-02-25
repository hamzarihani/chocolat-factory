"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }}
      >
        <Image
          src="/images/hero-chocolate.jpg"
          alt="Artisanal chocolate making process"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.02_50/0.7)] to-[oklch(0.15_0.02_50/0.5)]" />
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s ease-out, transform 1s ease-out" }}
      >
        <p
          className="text-sm font-serif tracking-[0.35em] uppercase text-[oklch(0.85_0.08_55)]"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s" }}
        >
          Est. 1897
        </p>
        <h1
          className="text-5xl font-bold tracking-tight text-balance text-[oklch(0.98_0.005_60)] md:text-7xl lg:text-8xl"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s" }}
        >
          Maison du Chocolat
        </h1>
        <p
          className="max-w-xl text-lg leading-relaxed text-[oklch(0.85_0.02_60)] font-serif"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s" }}
        >
          Where tradition meets artistry. Every piece is a masterwork, handcrafted
          from the world&apos;s finest cacao.
        </p>
        <Link
          href="#collection"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s, scale 0.3s ease, box-shadow 0.3s ease" }}
        >
          Explore Our Collection
        </Link>
      </div>
    </section>
  )
}
