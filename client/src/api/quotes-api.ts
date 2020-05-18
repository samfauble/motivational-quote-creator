import { apiEndpoint } from '../config'
import { Quote } from '../types/Quote';
import { CreateQuoteRequest } from '../types/CreateQuoteRequest';
import Axios from 'axios'
import { UpdateQuoteRequest } from '../types/UpdateQuoteRequest';

export async function getQuotes(idToken: string): Promise<Quote[]> {
  console.log('Fetching quotes')

  const response = await Axios.get(`${apiEndpoint}/quotes`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
  })
  console.log('Quotes:', response.data)
  return response.data.items
}

export async function createQuote(
  idToken: string,
  newQuote: CreateQuoteRequest
): Promise<Quote> {
  const response = await Axios.post(`${apiEndpoint}/quotes`, JSON.stringify(newQuote), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log(response)
  return response.data.quoteToAdd
}

export async function patchQuote(
  idToken: string,
  quoteId: string,
  updatedQuote: UpdateQuoteRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/quotes/${quoteId}`, JSON.stringify(updatedQuote), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteQuote(
  idToken: string,
  quoteId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/quotes/${quoteId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  quoteId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/quotes/${quoteId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log(response)
  return response.data.signedUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file).catch((err)=> {
    console.log(err)
  })
}
