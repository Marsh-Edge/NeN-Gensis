"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApiGuideProps {
  endpoint: string
  method?: string
  requestBody?: string
  exampleResponse?: string
  sourceUrl?: string
  sourceLabel?: string
}

export function ApiGuide({
  endpoint,
  method = "GET",
  requestBody,
  exampleResponse,
  sourceUrl,
  sourceLabel,
}: ApiGuideProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4" />
          <span>API Usage Guide</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground text-xs">Endpoint</span>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-mono font-semibold",
                method === "GET" ? "bg-green-500/15 text-green-400" : "bg-blue-500/15 text-blue-400"
              )}>
                {method}
              </span>
              <code className="text-xs text-foreground/80 font-mono break-all">{endpoint}</code>
            </div>
          </div>

          {requestBody && (
            <div>
              <span className="text-muted-foreground text-xs">Request Body</span>
              <pre className="mt-1 p-3 bg-black/30 rounded-xl text-[11px] text-foreground/70 font-mono overflow-x-auto">
                {requestBody}
              </pre>
            </div>
          )}

          {exampleResponse && (
            <div>
              <span className="text-muted-foreground text-xs">Example Response</span>
              <pre className="mt-1 p-3 bg-black/30 rounded-xl text-[11px] text-foreground/70 font-mono overflow-x-auto max-h-60 overflow-y-auto">
                {exampleResponse}
              </pre>
            </div>
          )}

          {sourceUrl && (
            <div className="pt-2 border-t border-border">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {sourceLabel || "Source"} ↗
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
