'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquarePlus } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"

interface Discussion {
  title: string
  content: string
}

export default function DiscussionForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [discussion, setDiscussion] = useState<Discussion>({ title: '', content: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDiscussion(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the discussion data to your backend
    console.log('Discussion submitted:', discussion)
    
    // // Show success message
    // toast({
    //   title: "Discussion posted",
    //   description: "Your discussion has been successfully posted.",
    //   duration: 3000,
    //   className: "bg-green-500 text-white",
    // })

    // Close the dialog and reset the form
    setIsOpen(false)
    setDiscussion({ title: '', content: '' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MessageSquarePlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Discussion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              name="title"
              value={discussion.title}
              onChange={handleInputChange}
              placeholder="Enter discussion title"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <Textarea
              id="content"
              name="content"
              value={discussion.content}
              onChange={handleInputChange}
              placeholder="Enter discussion content"
              required
            />
          </div>
          <Button type="submit" className="w-full">Post Discussion</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}