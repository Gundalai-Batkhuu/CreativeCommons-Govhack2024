'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquarePlus } from "lucide-react"


interface Discussion {
  title: string
  content: string
}

export default function DiscussionForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [discussion, setDiscussion] = useState<Discussion>({ title: '', content: '' })
  const [showNotification, setShowNotification] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDiscussion(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the discussion data to your backend
    console.log('Discussion submitted:', discussion)
    
    setShowNotification(true)

    // Close the dialog and reset the form
    setIsOpen(false)
    setDiscussion({ title: '', content: '' })
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    }, [showNotification])

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <MessageSquarePlus className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"/>
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
    <div className={`fixed top-20 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>Discussion posted successfully!</div>
    </>
  )
}