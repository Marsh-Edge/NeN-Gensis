import {
  LayoutGrid, ShieldCheck, Database, Code2, Image,
  CloudSun, BookOpenText, QrCode, KeyRound,
  Network, Globe, FileSearch,
  Map, GraduationCap, BookMarked, Rocket,
  GitBranch,  Package,  PackageOpen,  Fingerprint,
  ImagePlus, UserCircle, Palette, PawPrint,
  DollarSign,
  type LucideIcon,
} from "lucide-react"
import type { SVGProps } from "react"
import { cn } from "./utils"

const categoryIconMap: Record<string, LucideIcon> = {
  general: LayoutGrid,
  security: ShieldCheck,
  data: Database,
  development: Code2,
  media: Image,
}

const toolIconMap: Record<string, LucideIcon> = {
  weather: CloudSun,
  dictionary: BookOpenText,
  "qr-code": QrCode,
  "password-generator": KeyRound,
  "ip-info": Network,
  "dns-lookup": Globe,
  "header-check": FileSearch,
  countries: Map,
  universities: GraduationCap,
  books: BookMarked,
  space: Rocket,
  "github-profile": GitBranch,
  "npm-package": Package,
  "pypi-package": PackageOpen,
  "uuid-generator": Fingerprint,
  "placeholder-images": ImagePlus,
  "avatar-generator": UserCircle,
  "color-tools": Palette,
  "random-animal": PawPrint,
  "currency-converter": DollarSign,
}

export function CategoryIcon({
  slug,
  className,
  ...props
}: { slug: string; className?: string } & SVGProps<SVGSVGElement>) {
  const Icon = categoryIconMap[slug]
  if (!Icon) return null
  return <Icon className={cn("w-5 h-5", className)} {...props} />
}

export function ToolIcon({
  slug,
  className,
  ...props
}: { slug: string; className?: string } & SVGProps<SVGSVGElement>) {
  const Icon = toolIconMap[slug]
  if (!Icon) return null
  return <Icon className={cn("w-5 h-5", className)} {...props} />
}

export function IconBox({ slug, className }: { slug: string; className?: string }) {
  const Icon = toolIconMap[slug] ?? categoryIconMap[slug]
  if (!Icon) return null
  return (
    <div className={cn("w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center", className)}>
      <Icon className="w-5 h-5 text-foreground/80" aria-hidden="true" />
    </div>
  )
}
