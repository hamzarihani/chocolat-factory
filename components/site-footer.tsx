"use client"

import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLocale } from "@/lib/locale-context"

export function SiteFooter() {
  const { t } = useLocale()
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <footer
      ref={ref}
      className="bg-primary px-4 py-16 text-primary-foreground md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10">
        <Link
          href="/"
          className="text-2xl font-bold tracking-widest uppercase transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Maison du Chocolat
        </Link>
        <p
          className="max-w-md text-center text-sm leading-relaxed text-muted-foreground font-serif transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
          }}
        >
          {t("footer.description")}
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
            {t("navigation.products")}
          </Link>
          <Link href="#story" className="text-sm text-muted-foreground transition-all duration-300 hover:text-accent hover:tracking-wider">
            {t("navigation.story")}
          </Link>
          <Link href="/admin" className="text-sm text-muted-foreground transition-all duration-300 hover:text-accent hover:tracking-wider">
            {t("navigation.admin")}
          </Link>
        </div>
        <p
          className="text-xs text-muted-foreground/50 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.45s",
          }}
        >
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
