"use client"

import { useEffect } from "react"

export function ClickGlow() {
  useEffect(() => {
    const timers = new Set<number>()

    function handler(e: PointerEvent) {
      if (e.button !== 0 || e.pointerType !== "mouse") return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const el = document.createElement("div")
      el.className = "click-glow"
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      document.body.appendChild(el)

      const id = window.setTimeout(() => {
        el.remove()
        timers.delete(id)
      }, 800)
      timers.add(id)
    }

    document.addEventListener("pointerdown", handler)
    return () => {
      document.removeEventListener("pointerdown", handler)
      timers.forEach((id) => window.clearTimeout(id))
      timers.clear()
    }
  }, [])

  return null
}
