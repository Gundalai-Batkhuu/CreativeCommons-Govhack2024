'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronUp, MessageSquare, CheckCircle2 } from "lucide-react"
import DiscussionForm from "@/components/discussion-form"

// TypeScript interfaces
interface User {
  id: string
  name: string
  avatarUrl: string
}

interface Comment {
  id: string
  author: User
  content: string
  createdAt: string
  upvotes: number
  isAnswer: boolean
  replies: Comment[]
}

interface Thread {
  id: string
  title: string
  author: User
  content: string
  contentBreak?: string 
  createdAt: string
  comments: Comment[]
}

// Mock data
const mockThread: Thread = {
  id: '1',
  title: "Delay in Receiving Disability Payments - Need Advice?",
  author: { id: '1', name: "Jack", avatarUrl: "/avatar/av5.png?height=40&width=40" },
  content: "I’ve been approved for disability payments, but I’m facing an issue. It’s been six weeks since my approval, and I still haven’t received any payments. I checked my MyGov account, and everything looks correct, including my bank details and personal information. Has anyone else been through something like this? Any suggestions on how to escalate the issue or get it resolved?",
  contentBreak: "Thanks in advance for your help!.",
  createdAt: "2023-06-15T10:00:00Z",
  comments: [
    {
      id: '2',
      author: { id: '2', name: "Bob", avatarUrl: "/avatar/av1.png?height=40&width=40" },
      content: "Hi Jack,\n\nSorry to hear about your situation. I had a similar problem last year, and this is what worked for me:\n\n1. Lodged a formal complaint via the Centrelink website. After that, they processed my payments within two weeks.\n2. If that doesn’t work, you can request a review of your case, or ask them to escalate it to a higher-level officer.\n\nIf things are really tight financially, you can also inquire about crisis payments or advances to help tide you over until the regular payments start.",
      createdAt: "2023-06-15T10:30:00Z",
      upvotes: 15,
      isAnswer: true,
      replies: [
        {
          id: '3',
          author: { id: '1', name: "Maya", avatarUrl: "/avatar/av2.png?height=40&width=40" },
          content: "Thank you so much! This worked perfectly for me.",
          createdAt: "2023-06-15T11:00:00Z",
          upvotes: 2,
          isAnswer: false,
          replies: []
        }
      ]
    },
    {
      id: '4',
      author: { id: '3', name: "Krish", avatarUrl: "/avatar/av3.png?height=40&width=40" },
      content: "Hey Jack,\n\nI went through a similar delay with my disability payments. It’s frustrating, I know! Here are a couple of things that I did that time\n\ni. Check if your case is under review: I found out my payment was delayed because my application was flagged for additional checks. Maybe ask them directly if that’s the case\nii. Talk to a welfare advocate: There are community organisations that can help you deal with Centrelink. They might be able to put some pressure on for you.\n\n Hope you get it sorted out soon!",
      createdAt: "2023-06-15T12:00:00Z",
      upvotes: 8,
      isAnswer: false,
      replies: []
    }
  ]
}

const CommentComponent: React.FC<{ 
  comment: Comment, 
  level?: number, 
  onUpvote: (id: string) => void, 
  onMarkAsAnswer: (id: string) => void,
  onReply: (parentId: string, content: string) => void
}> = ({ comment, level = 0, onUpvote, onMarkAsAnswer, onReply }) => {
  const [replyContent, setReplyContent] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  return (
    <><DiscussionForm />
    <div className={`mb-4 ${level > 0 ? 'ml-8 border-l pl-4' : ''}`}>
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <div className="mt-2 text-gray-700 whitespace-pre-wrap">{comment.content}</div>

          <div className="mt-2 flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => onUpvote(comment.id)}>
              <ChevronUp className="mr-1 h-4 w-4" />
              {comment.upvotes}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsReplying(!isReplying)}>
              <MessageSquare className="mr-1 h-4 w-4" />
              Reply
            </Button>
            {!comment.isAnswer && level === 0 && (
              <Button variant="ghost" size="sm" onClick={() => onMarkAsAnswer(comment.id)}>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Mark as Answer
              </Button>
            )}
          </div>
          {isReplying && (
            <div className="mt-2">
              <Textarea 
                value={replyContent} 
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="mb-2"
              />
              <Button onClick={() => {
                onReply(comment.id, replyContent)
                setReplyContent('')
                setIsReplying(false)
              }}>
                Post Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {comment.replies.map(reply => (
        <CommentComponent 
          key={reply.id} 
          comment={reply} 
          level={level + 1}
          onUpvote={onUpvote}
          onMarkAsAnswer={onMarkAsAnswer}
          onReply={onReply}
        />
      ))}
    </div>
    </>
  )
}

export default function Discussion() {
  const [thread, setThread] = useState<Thread>(mockThread)
  const [newCommentContent, setNewCommentContent] = useState('')

  const handleUpvote = (commentId: string) => {
    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, upvotes: comment.upvotes + 1 }
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateComments(comment.replies) }
        }
        return comment
      })
    }

    setThread(prevThread => ({
      ...prevThread,
      comments: updateComments(prevThread.comments)
    }))
  }

  const handleMarkAsAnswer = (commentId: string) => {
    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, isAnswer: true }
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateComments(comment.replies) }
        }
        return { ...comment, isAnswer: false }
      })
    }

    setThread(prevThread => ({
      ...prevThread,
      comments: updateComments(prevThread.comments)
    }))
  }

  const handleAddComment = (parentId: string | null, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: { id: 'current-user', name: 'Ben', avatarUrl: "/placeholder.svg?height=40&width=40" },
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      isAnswer: false,
      replies: []
    }

    if (parentId === null) {
      setThread(prevThread => ({
        ...prevThread,
        comments: [...prevThread.comments, newComment]
      }))
    } else {
      const updateComments = (comments: Comment[]): Comment[] => {
        return comments.map(comment => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...comment.replies, newComment] }
          }
          if (comment.replies.length > 0) {
            return { ...comment, replies: updateComments(comment.replies) }
          }
          return comment
        })
      }

      setThread(prevThread => ({
        ...prevThread,
        comments: updateComments(prevThread.comments)
      }))
    }

    setNewCommentContent('')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar>
            <AvatarImage src={thread.author.avatarUrl} alt={thread.author.name} />
            <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{thread.author.name}</span>
          <span className="text-sm text-gray-500">
            {new Date(thread.createdAt).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-700">{thread.content}</p>
        <br></br>
        {thread.contentBreak && <p className="text-gray-700">{thread.contentBreak}</p>}
      </div>

      <div className="mb-8 p-4 border-2 border-green-500">
        <h2 className="text-2xl font-semibold mb-4">
          {thread.comments.filter(c => c.isAnswer).length > 0 ? 'Answer' : 'Answers'}
        </h2>
        {thread.comments
          .filter(comment => comment.isAnswer)
          .map(comment => (
            <CommentComponent 
              key={comment.id} 
              comment={comment}
              onUpvote={handleUpvote}
              onMarkAsAnswer={handleMarkAsAnswer}
              onReply={(parentId, content) => handleAddComment(parentId, content)}
            />
          ))
        }
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">All Comments</h2>
        {thread.comments
          .filter(comment => !comment.isAnswer)
          .map(comment => (
            <CommentComponent 
              key={comment.id} 
              comment={comment}
              onUpvote={handleUpvote}
              onMarkAsAnswer={handleMarkAsAnswer}
              onReply={(parentId, content) => handleAddComment(parentId, content)}
            />
          ))
        }
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2>
        <Textarea 
          value={newCommentContent} 
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Write your comment..."
          className="mb-2"
        />
        <Button onClick={() => handleAddComment(null, newCommentContent)}>
          Post Comment
        </Button>
      </div>
    </div>
  )
}