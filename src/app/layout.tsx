import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClickGlow } from "@/components/ClickGlow"

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"?"light":"dark";document.documentElement.classList.toggle("dark",d==="dark");}catch(e){document.documentElement.classList.add("dark");}})();`

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NeN-Gensis — Free API Hub",
    template: "%s | NeN-Gensis",
  },
  description:
    "Browse and use 20 free APIs — weather, DNS, IP lookup, currency, QR codes, and more. No API keys required.",
  keywords: [
    "free APIs",
    "public APIs",
    "developer tools",
    "API hub",
    "no API key",
    "web utilities",
  ],
  applicationName: "NeN-Gensis",
  authors: [{ name: "NeN-Gensis" }],
  openGraph: {
    type: "website",
    siteName: "NeN-Gensis",
    title: "NeN-Gensis — Free API Hub",
    description:
      "Browse and use 20 free APIs — weather, DNS, IP lookup, currency, QR codes, and more. No API keys required.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeN-Gensis — Free API Hub",
    description:
      "Browse and use 20 free APIs — weather, DNS, IP lookup, currency, QR codes, and more. No API keys required.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-full font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
          >
            Skip to content
          </a>
          <Sidebar />
          <TopBar />
          <main id="main-content" className="lg:pl-64 pt-14 lg:pt-0 min-h-screen animate-fade-in-up">
            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
          <ClickGlow />
        </ThemeProvider>
      </body>
    </html>
  )
}
