import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ApiCard } from "@/components/ApiCard"
import { getCategory, getToolsByCategory } from "@/lib/constants"

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const category = getCategory(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(slug)
  const activeTools = tools.filter((t) => t.status === "active")

  return (
    <div className="space-y-8">
      <div className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${category.accent} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-white/80 hover:text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {category.name}
              </h1>
              <p className="text-white/70 text-sm sm:text-base mt-1">
                {category.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Badge variant="glass" className="text-white/90 border-white/20">
              {tools.length} tools
            </Badge>
            {activeTools.length > 0 && (
              <Badge variant="success">{activeTools.length} available now</Badge>
            )}
          </div>
        </div>
      </div>

      {tools.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-white/40 text-sm">
            No APIs available in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {tools.map((tool) => (
            <ApiCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
