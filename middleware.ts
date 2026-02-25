import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./i18n.config"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

function getLocale(request: NextRequest): string {
  // 1. Check if locale is already in cookies
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale
  }

  // 2. Negotiate from headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  try {
    return matchLocale(languages, locales, i18n.defaultLocale)
  } catch (e) {
    return i18n.defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip public files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api") ||
    pathname.includes(".") // matches files like .png, .ico, etc.
  ) {
    return
  }

  const locale = getLocale(request)
  const response = NextResponse.next()

  // Set the locale in a cookie if it's not already there or if it changed
  if (request.cookies.get("NEXT_LOCALE")?.value !== locale) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  // Also pass the locale in a custom header so Server Components can read it easily
  response.headers.set("x-next-locale", locale)

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

