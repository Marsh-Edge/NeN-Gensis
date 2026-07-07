import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceholderWidget } from "@/components/PlaceholderWidget"

export default function PlaceholderPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/media"><Button variant="ghost" size="sm" className="h-8 px-2"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <span className="text-2xl">🖼</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Placeholder Images</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-white/50 text-sm sm:text-base">Generate random placeholder images by picsum.photos with custom dimensions.</p>
      </div>
      <PlaceholderWidget />
    </div>
  )
}
