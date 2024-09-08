import React from 'react';
import { Button } from '@/components/ui/button'

const cn = (...classes: (string | undefined)[]): string => classes.filter(Boolean).join(' ');

interface SimplifyResponseProps {
  className?: string;
}

export default function SimplifyResponse({ className }: SimplifyResponseProps) {
  return (
    <div
      className={cn(
        'flex items-center space-x-4',
        'mt-2',
        'transition-opacity group-hover:opacity-100 md:opacity-0',
        className
      )}
    >
      <Button variant="ghost" className="hover:bg-gray-200">
        Simplify language
      </Button>
    </div>
  );
}