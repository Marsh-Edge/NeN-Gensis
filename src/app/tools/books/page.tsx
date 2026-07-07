import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolIcon } from "@/lib/icons"
import { BookSearchWidget } from "@/components/BookSearchWidget"
import { ApiGuide } from "@/components/ApiGuide"

export default function BooksPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/categories/data">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <ToolIcon slug="books" className="w-7 h-7 text-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Book Search</h1>
          <Badge variant="success" className="text-[10px]">Free • No API Key</Badge>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Search millions of books by title or author — covers, publish dates, and ISBNs.
        </p>
      </div>

      <BookSearchWidget />

      <ApiGuide
        endpoint="POST /api/books"
        method="POST"
        requestBody='{ "query": "The Hobbit" }'
        exampleResponse={`{
  "results": [
    { "title": "The Hobbit", "author": "J.R.R. Tolkien", "firstPublishYear": 1937, "coverId": 123456 }
  ]
}`}
        sourceUrl="https://openlibrary.org"
        sourceLabel="Open Library API"
      />
    </div>
  )
}
