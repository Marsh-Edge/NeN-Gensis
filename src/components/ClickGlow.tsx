"use client"

import { useEffect } from "react"

export function ClickGlow() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = document.createElement("div")
      el.className = "click-glow"
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 800)
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  return null
}
