/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateQuoteRequest {
  quoteBody: string
  author: string
  like: boolean
  attachmentUrl?: string
}