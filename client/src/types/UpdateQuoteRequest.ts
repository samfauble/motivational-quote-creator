export interface UpdateQuoteRequest {
  quoteBody: string
  author: string
  like: boolean
  attachmentUrl?: string
}