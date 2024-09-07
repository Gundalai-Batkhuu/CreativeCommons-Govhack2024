'use client'

import TextToSpeech from '@/components/accessibility/text-to-speech'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: string
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {

  return (
    <TextToSpeech text={message} className={className} {...props} />
  )
}
