import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateQuoteRequest } from '../../../requests/CreateQuoteRequest'
import * as uuid from "uuid"
import { logOperation, generalUseLogger } from "../../utils"
import { dbHandlerPut } from "../dataLayer/putData"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newQuote: CreateQuoteRequest = JSON.parse(event.body)
  const itemId = uuid.v4()
  generalUseLogger(newQuote)
  
  const quoteToAdd = {
    quoteId: itemId,
    done: false,
    ...newQuote
  }

  await dbHandlerPut(quoteToAdd).then(() => {
    logOperation(quoteToAdd.userId, "create quote", true)
  }).catch(() => {
    logOperation(quoteToAdd, "create quote", false)
  })
  

  // TODO: Implement creating a new TODO item
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      quoteToAdd
    })
  }
}
