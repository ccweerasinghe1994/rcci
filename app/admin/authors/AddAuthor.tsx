import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState } from "react"

interface AddAuthorProps {
  onAddAuthor: (author: { name: string; position: string; biography: string }) => void
}

export function AddAuthor({ onAddAuthor }: AddAuthorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    position: "",
    biography: "",
  })

  const handleAddAuthor = () => {
    onAddAuthor(newAuthor)
    setNewAuthor({ name: "", position: "", biography: "" })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Author
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Author</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newAuthor.name}
              onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={newAuthor.position}
              onChange={(e) => setNewAuthor({ ...newAuthor, position: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biography">Biography</Label>
            <Textarea
              id="biography"
              rows={4}
              value={newAuthor.biography}
              onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddAuthor}>Add Author</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 