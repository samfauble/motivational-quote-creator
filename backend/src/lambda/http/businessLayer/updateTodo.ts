import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../../requests/UpdateTodoRequest'
import { logOperation, generalUseLogger } from "../../utils"
import { dbHandlerUpdate } from "../dataLayer/updateData"
import { getUserId } from "../userIdFromAuth"


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId: string = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  
  generalUseLogger(todoId)
  generalUseLogger(updatedTodo)

  await dbHandlerUpdate(userId, todoId, updatedTodo).then(() => {
    logOperation(updatedTodo, "update todo", true)
  }).catch(() => {
    logOperation(updatedTodo, "update todo", false)
  })

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({updatedTodo})
  }
}
