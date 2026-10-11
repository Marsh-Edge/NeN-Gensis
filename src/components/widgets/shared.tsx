import type { ReactNode } from "react"

export function Flag({ code, className = "text-2xl" }: { code: string; className?: string }) {
  if (!code || code.length !== 2) return null
  const flag = String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
  return <span className={className}>{flag}</span>
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <span
        className="text-sm text-white/80 font-medium text-right truncate max-w-[60%]"
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
      {icon && <div className="flex justify-center mb-1 text-white/40">{icon}</div>}
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <div className={`text-sm font-semibold text-white ${className ?? ""}`}>
        {children ?? value ?? "—"}
      </div>
    </div>
  )
}
