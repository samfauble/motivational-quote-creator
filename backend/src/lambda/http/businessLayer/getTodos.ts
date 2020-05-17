import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { logOperation, generalUseLogger } from "../../utils"
import { dbHandlerQuery } from "../dataLayer/getData"
import { getUserId } from "../userIdFromAuth"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const userId = getUserId(event)

  const res = await dbHandlerQuery(userId)
  const items = res.Items
  generalUseLogger([JSON.stringify({items}), userId])
  
  if(!items) {
    logOperation(items, "get todos", false)
  } else {
    logOperation(items, "get todos", true)
  }
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items
    })
  }
  // TODO: Get all TODO items for a current user
}