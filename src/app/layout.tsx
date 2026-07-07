import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClickGlow } from "@/components/ClickGlow"
import { KeyboardGuard } from "@/components/KeyboardGuard"

export const metadata: Metadata = {
  title: "NeN-Gensis — Free API Hub",
  description: "Browse and use free APIs, all categorized for your convenience",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <ThemeProvider>
          <Sidebar />
          <TopBar />
          <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen animate-fade-in-up">
            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
          <ClickGlow />
          <KeyboardGuard />
        </ThemeProvider>
      </body>
    </html>
  )
}
