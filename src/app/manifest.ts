import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NeN-Gensis — Free API Hub",
    short_name: "NeN-Gensis",
    description:
      "Browse and use 20 free APIs — weather, DNS, IP lookup, currency, QR codes, and more. No API keys required.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0c29",
    theme_color: "#22d3ee",
  }
}
