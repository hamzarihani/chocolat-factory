"use client"

import { useLocale } from "@/lib/locale-context"
import { i18n, type Locale } from "@/i18n.config"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
}

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2 text-[oklch(0.85_0.02_60)] hover:text-[oklch(0.98_0.005_60)]">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{localeNames[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={locale === loc ? "bg-accent text-accent-foreground" : ""}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
