import type { ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Flag({ code, className = "text-2xl" }: { code: string; className?: string }) {
  if (!code || code.length !== 2) return null
  const flag = String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
  return <span className={className}>{flag}</span>
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className="text-sm text-foreground/80 font-medium text-right truncate max-w-[60%]"
        title={value}
      >
        {value || "—"}
      </span>
    </div>
  )
}

export function MetricBox({
  icon,
  label,
  value,
  className,
  children,
}: {
  icon?: ReactNode
  label: string
  value?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      {icon && <div className="flex justify-center mb-1 text-muted-foreground">{icon}</div>}
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className={`text-sm font-semibold text-foreground tabular-nums ${className ?? ""}`}>
        {children ?? value ?? "—"}
      </div>
    </div>
  )
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <Card>
      <CardContent className="p-6 text-center space-y-3">
        <AlertTriangle className="w-8 h-8 mx-auto text-destructive" aria-hidden="true" />
        <p className="text-sm text-destructive" role="alert">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
            Try again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
