import type { Metadata } from 'next'
import { Playfair_Display, Lora, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { cookies } from 'next/headers'
import { getDictionary } from '@/lib/get-dictionary'
import { LocaleProvider } from '@/lib/locale-context'
import type { Locale } from '@/i18n.config'
import './globals.css'

const _playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })
const _lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Maison du Chocolat | Artisanal Chocolate Factory',
  description: 'Handcrafted luxury chocolates made with the finest ingredients. Discover our truffles, bonbons, bars, and specialty creations.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'fr'
  const dictionary = await getDictionary(locale)
  const isRtl = locale === 'ar'

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LocaleProvider initialLocale={locale} dictionary={dictionary}>
          {children}
        </LocaleProvider>
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}


