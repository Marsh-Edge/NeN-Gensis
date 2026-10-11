import Link from "next/link"
import { ArrowLeft, GitBranch, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
          Back
        </Button>
      </Link>

      <div className="glass-strong rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            N
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">NeN-Gensis</h1>
            <p className="text-muted-foreground text-sm">Free API Hub — v0.1.0</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            NeN-Gensis is a curated collection of free, publicly available APIs organized by category.
            Browse, explore, and use APIs directly for weather, networking, data lookup, development tools,
            and media generation — all without signing up or dealing with rate limits.
          </p>

          <p>
            Every API tool includes an interactive interface so you can test endpoints immediately
            and see real responses. Perfect for developers who need quick access to common API
            functionality during development, testing, or learning.
          </p>

          <p>
            Built with <span className="text-foreground">Next.js 16</span>,{" "}
            <span className="text-foreground">TypeScript</span>, and{" "}
            <span className="text-foreground">Tailwind CSS 4</span>.
            UI components powered by shadcn/ui and Lucide icons.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://github.com/Marsh-Edge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-foreground hover:bg-foreground/10 transition-colors"
          >
            <GitBranch className="w-4 h-4" aria-hidden="true" />
            @Marsh-Edge on GitHub
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-foreground hover:bg-foreground/10 transition-colors"
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            Browse APIs
          </Link>
        </div>
      </div>
    </div>
  )
}
