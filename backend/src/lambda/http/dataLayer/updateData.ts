import * as AWS from 'aws-sdk'
import { UpdateQuoteRequest } from '../../../requests/UpdateQuoteRequest'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.QUOTES_TABLE


export const dbHandlerUpdate = async (userId:string, quoteId: string, updatedQuote: UpdateQuoteRequest) => {
    return await docClient.update({
      TableName: table,
      Key: {userId, quoteId},
      ...updatedQuote,

    }).promise()
  }

export const dbAttachmentUrlUpdate = async (userId:string, quoteId: string, attachmentUrl: string) => {
  return await docClient.update({
    TableName: table,
    Key: {userId, quoteId},
    UpdateExpression: "set attachmentUrl = :url",
    ExpressionAttributeValues: {
      ":url": attachmentUrl
    }

  }).promise()
}