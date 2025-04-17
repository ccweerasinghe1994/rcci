import { getAuthors } from "./actions"
import { AddAuthor } from "./AddAuthor"
import { ManageAuthors } from "./ManageAuthors"

export default async function AuthorsPage() {
  const { authors, error } = await getAuthors()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Authors</h2>
        <AddAuthor />
      </div>
      
      {error ? (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>
      ) : (
        <ManageAuthors authors={authors || []} />
      )}
    </div>
  )
}
