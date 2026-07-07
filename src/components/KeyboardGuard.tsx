"use client"

import { useEffect } from "react"

export function KeyboardGuard() {
  useEffect(() => {
    function guard(e: KeyboardEvent) {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "u" && !e.shiftKey)
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    function contextGuard(e: MouseEvent) {
      e.preventDefault()
      return false
    }

    document.addEventListener("keydown", guard, true)
    document.addEventListener("contextmenu", contextGuard, true)
    return () => {
      document.removeEventListener("keydown", guard, true)
      document.removeEventListener("contextmenu", contextGuard, true)
    }
  }, [])

  return null
}
