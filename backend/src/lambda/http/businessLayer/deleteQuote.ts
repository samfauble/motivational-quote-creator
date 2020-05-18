import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { logOperation } from "../../utils"
import { dbHandlerDelete } from "../dataLayer/deleteData"
import { getUserId } from "../userIdFromAuth"


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const quoteId = event.pathParameters.quoteId
    const userId = getUserId(event)

    await dbHandlerDelete(quoteId, userId).catch(()=> {
      logOperation(quoteId, "delete quote", false)
    });
      


    // TODO: Remove a TODO item by id
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: ''
    }
  }