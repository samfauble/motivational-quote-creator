/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateQuoteRequest {
  quoteBody: string
  author: string
  userId?: string
}
