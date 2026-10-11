"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Link2, MonitorSmartphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApiGuideProps {
  endpoint?: string
  method?: string
  requestBody?: string
  exampleResponse?: string
  sourceUrl?: string
  sourceLabel?: string
  clientSide?: boolean
}

export function ApiGuide({
  endpoint,
  method = "GET",
  requestBody,
  exampleResponse,
  sourceUrl,
  sourceLabel,
  clientSide = false,
}: ApiGuideProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4" aria-hidden="true" />
          <span>{clientSide ? "How It Works" : "API Usage Guide"}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm">
          {clientSide ? (
            <div className="flex items-start gap-2 rounded-xl bg-foreground/5 border border-border p-3 text-xs text-muted-foreground">
              <MonitorSmartphone className="w-4 h-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Runs entirely in your browser — your input never leaves this device.
              </span>
            </div>
          ) : (
            endpoint && (
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
            )
          )}

          {requestBody && (
            <div>
              <span className="text-muted-foreground text-xs">Request Body</span>
              <pre className="mt-1 p-3 bg-foreground/5 border border-border rounded-xl text-[11px] text-foreground/70 font-mono overflow-x-auto">
                {requestBody}
              </pre>
            </div>
          )}

          {exampleResponse && (
            <div>
              <span className="text-muted-foreground text-xs">
                {clientSide ? "Example Output" : "Example Response"}
              </span>
              <pre className="mt-1 p-3 bg-foreground/5 border border-border rounded-xl text-[11px] text-foreground/70 font-mono overflow-x-auto max-h-60 overflow-y-auto">
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
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                {sourceLabel || "Source"} ↗
              </a>
            </div>
          )}

          {!sourceUrl && sourceLabel && (
            <div className="pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">{sourceLabel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
