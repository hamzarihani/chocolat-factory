"use client"

import React, { createContext, useContext, useState, useMemo } from "react"
import type { Locale } from "@/i18n.config"
import { getT } from "./i18n-utils"

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({
  children,
  initialLocale,
  dictionary,
}: {
  children: React.ReactNode
  initialLocale: Locale
  dictionary: any
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const t = useMemo(() => getT(dictionary), [dictionary])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    // Update cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    // Refresh to apply server-side changes
    window.location.reload()
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}


export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
