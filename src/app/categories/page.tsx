import { CategoryCard } from "@/components/CategoryCard"
import { categories } from "@/lib/constants"

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Categories
        </h1>
        <p className="text-white/50 text-sm sm:text-base">
          Explore all available API categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </div>
  )
}
