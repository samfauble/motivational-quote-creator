export interface Quote {
  quoteId: string         //todoId
  quoteBody: string       // name
  author: string          //dueDate
  like: boolean           // Done
  attachmentUrl?: string
  userId?: string
}
