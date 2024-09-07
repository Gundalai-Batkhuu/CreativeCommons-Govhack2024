
export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          Get started by selecting the document you want to query on the right sidebar and start typing a message in the chat box below.
        </p>
      </div>
    </div>
  )
}
