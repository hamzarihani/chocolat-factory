import "server-only"
import type { Locale } from "@/i18n.config"
import { getT } from "./i18n-utils"

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.fr()

export const getDictionaryServer = async (locale: Locale) => {
  const dict = await getDictionary(locale)
  return {
    t: getT(dict),
    dict
  }
}

