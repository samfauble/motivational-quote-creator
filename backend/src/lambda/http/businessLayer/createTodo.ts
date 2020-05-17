import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../../requests/CreateTodoRequest'
import * as uuid from "uuid"
import { logOperation, generalUseLogger } from "../../utils"
import { dbHandlerPut } from "../dataLayer/putData"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const itemId = uuid.v4()
  generalUseLogger(newTodo)

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  
  const todoToAdd = {
    todoId: itemId,
    createdAt: dateTime,
    done: false,
    ...newTodo
  }

  await dbHandlerPut(todoToAdd).then(() => {
    logOperation(todoToAdd.userId, "create todo", true)
  }).catch(() => {
    logOperation(todoToAdd, "create todo", false)
  })
  

  // TODO: Implement creating a new TODO item
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      todoToAdd
    })
  }
}
