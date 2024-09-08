import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, SquareMousePointer, FileText } from 'lucide-react';
import DiscussionForm from '@/components/discussion-form'

const cn = (...classes: (string | undefined)[]): string => classes.filter(Boolean).join(' ');

interface ChatToolCollectionProps {
  className?: string;
}

const IconWrapper = ({ children, tooltip }: { children: React.ReactNode; tooltip: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap mb-1">
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default function ChatToolCollection({ className }: ChatToolCollectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-4 transition-opacity group-hover:opacity-100 md:opacity-0',
        'mt-2',
        className
      )}
    >
      <IconWrapper tooltip={isLiked ? "Unlike" : "Like"}>
        <ThumbsUp
          className={cn(
            "w-5 h-5 cursor-pointer",
            isLiked ? "text-blue-500 hover:text-blue-600" : "text-gray-500 hover:text-gray-700"
          )}
          onClick={handleLike}
        />
      </IconWrapper>
      <IconWrapper tooltip={isDisliked ? "Undo dislike" : "Dislike"}>
        <ThumbsDown
          className={cn(
            "w-5 h-5 cursor-pointer",
            isDisliked ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-gray-700"
          )}
          onClick={handleDislike}
        />
      </IconWrapper>
      <IconWrapper tooltip="Talk to a human">
        <SquareMousePointer className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </IconWrapper>
      <IconWrapper tooltip="Source: https://www.disability...">
        <FileText className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </IconWrapper>
      <IconWrapper tooltip="Create a new discussion">
        <DiscussionForm />
      </IconWrapper>
    </div>
  );
}