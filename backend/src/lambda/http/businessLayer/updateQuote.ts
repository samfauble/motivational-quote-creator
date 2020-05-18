import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateQuoteRequest } from '../../../requests/UpdateQuoteRequest'
import { logOperation, generalUseLogger } from "../../utils"
import { dbHandlerUpdate } from "../dataLayer/updateData"
import { getUserId } from "../userIdFromAuth"


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const quoteId: string = event.pathParameters.quoteId
  const updatedQuote: UpdateQuoteRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  
  generalUseLogger(quoteId)
  generalUseLogger(updatedQuote)

  await dbHandlerUpdate(userId, quoteId, updatedQuote).then(() => {
    logOperation(updatedQuote, "update quote", true)
  }).catch(() => {
    logOperation(updatedQuote, "update quote", false)
  })

  // TODO: Update a TODO item with the provided id using values in the "updatedQuote" object
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({updatedQuote})
  }
}
