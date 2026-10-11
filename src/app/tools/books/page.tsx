import { ToolPage } from "@/components/ToolPage"
import { BookSearchWidget } from "@/components/BookSearchWidget"
import { toolMetadata } from "@/lib/toolDocs"

export const generateMetadata = toolMetadata("books")

export default function BooksPage() {
  return <ToolPage slug="books" widget={<BookSearchWidget />} />
}
