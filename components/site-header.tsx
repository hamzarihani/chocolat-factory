"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import LocaleSwitcher from "./locale-switcher"
import { useLocale } from "@/lib/locale-context"

export function SiteHeader() {
  const { t } = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 py-4 transition-all duration-500 md:px-8 ${
        scrolled
          ? "bg-[oklch(0.15_0.02_50/0.8)] backdrop-blur-md border-b border-[oklch(0.98_0.005_60/0.1)] py-3"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-[oklch(0.98_0.005_60)] transition-transform duration-300 hover:scale-105"
        >
          Maison du Chocolat
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href="#collection"
            className="hidden text-sm text-[oklch(0.85_0.02_60)] transition-all duration-300 hover:text-[oklch(0.98_0.005_60)] hover:tracking-wider md:inline-block"
          >
            {t("navigation.products")}
          </Link>
          <Link
            href="#story"
            className="hidden text-sm text-[oklch(0.85_0.02_60)] transition-all duration-300 hover:text-[oklch(0.98_0.005_60)] hover:tracking-wider md:inline-block"
          >
            {t("navigation.story")}
          </Link>
          <LocaleSwitcher />
          <Link
            href="/admin"
            className="rounded-full border border-[oklch(0.85_0.02_60/0.3)] px-5 py-2 text-sm text-[oklch(0.85_0.02_60)] transition-all duration-300 hover:border-[oklch(0.85_0.02_60/0.6)] hover:text-[oklch(0.98_0.005_60)] hover:bg-[oklch(0.98_0.005_60/0.1)] hover:scale-105"
          >
            {t("navigation.admin")}
          </Link>
        </div>
      </nav>
    </header>
  )
}

