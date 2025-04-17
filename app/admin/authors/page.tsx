"use client"

import { useState } from "react"
import { AddAuthor } from "./AddAuthor"
import { ManageAuthors } from "./ManageAuthors"

// Sample data for authors
const initialAuthors = [
  {
    id: "1",
    name: "John Doe",
    position: "Editor-in-Chief",
    biography: "John has been writing about business and economics for over 15 years.",
    authorImage: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Senior Writer",
    biography: "Jane specializes in technology and innovation topics.",
    authorImage: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Robert Johnson",
    position: "Contributing Editor",
    biography: "Robert brings insights from his 20 years of experience in the industry.",
    authorImage: "https://via.placeholder.com/150",
  },
]

interface Author {
  id: string
  name: string
  position: string
  biography: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>(initialAuthors)

  const handleAddAuthor = (newAuthor: { name: string; position: string; biography: string }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setAuthors([...authors, { id, ...newAuthor }])
  }

  const handleEditAuthor = (updatedAuthor: Author) => {
    setAuthors(authors.map((author) => (author.id === updatedAuthor.id ? updatedAuthor : author)))
  }

  const handleDeleteAuthor = (authorId: string) => {
    setAuthors(authors.filter((author) => author.id !== authorId))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Authors</h2>
        <AddAuthor onAddAuthor={handleAddAuthor} />
      </div>
      
      <ManageAuthors 
        authors={authors}
        onEditAuthor={handleEditAuthor}
        onDeleteAuthor={handleDeleteAuthor}
      />
    </div>
  )
}
