export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="glass rounded-2xl p-8 sm:p-10">
        <div className="h-8 w-48 rounded-lg bg-foreground/10 animate-pulse" />
        <div className="mt-4 h-4 w-72 max-w-full rounded bg-foreground/10 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-2xl p-6 h-36 animate-pulse" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}