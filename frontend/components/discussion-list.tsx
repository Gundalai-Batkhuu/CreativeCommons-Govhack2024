'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, ThumbsUp, Eye, Search } from "lucide-react"

interface Discussion {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  date: string
  content: string
  likes: number
  comments: number
  views: number
}

const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'Accessing Essential Services.',
    author: {
      name: 'Malika',
      avatar: '/avatar/av6.png?height=40&width=40'
    },
    date: '2023-06-15',
    content: "I've been struggling to find the right counselling for my financial problems and mental issues. Can anyone help?",
    likes: 0,
    comments: 0,
    views: 2
  },
  {
    id: '2',
    title: 'Issues with MyGov Online Portals',
    author: {
      name: 'Jane',
      avatar: '/avatar/av2.png?height=40&width=40'
    },
    date: '2023-06-14',
    content: "After switching to a new platform, I can't see the services that I have been using. Is that an issue with the current update?",
    likes: 12,
    comments: 7,
    views: 256
  },
  {
    id: '3',
    title: 'Delay in Receiving Disability Payments - Need Advice?',
    author: {
      name: 'Jack',
      avatar: '/avatar/av5.png?height=40&width=40'
    },
    date: '2023-06-13',
    content: "I’ve been approved for disability payments, but I’m facing an issue. It’s been six weeks since my approval, and I still haven’t received any payments. I...",
    likes: 8,
    comments: 15,
    views: 310
  }
]

export default function DiscussionList() {
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleLike = (id: string) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === id ? { ...discussion, likes: discussion.likes + 1 } : discussion
      )
    )
  }

  const handleNavigate = (id: string) => {
    router.push(`/discussion`)
  }

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4 mb-10 flex flex-col justify-center items-center">
        <div className="mt-4 flex justify-center w-full">
            <div className="relative w-[95%]">
                <Input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
        </div>    
      {filteredDiscussions.map(discussion => (
        <Card 
          key={discussion.id} 
          className="transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg cursor-pointer w-[95%]"
          onClick={() => handleNavigate(discussion.id)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={discussion.author.avatar} />
                  <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{discussion.title}</CardTitle>
                  <CardDescription>
                    Posted by {discussion.author.name} on {discussion.date}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{discussion.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(discussion.id);
                }}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                {discussion.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                {discussion.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                {discussion.views}
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}