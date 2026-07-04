import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-2xl">{category.icon}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {category.name}
        </h1>
        <p className="text-white/50 text-sm sm:text-base">
          {category.description}
        </p>
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
