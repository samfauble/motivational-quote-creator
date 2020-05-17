import * as AWS from 'aws-sdk'
import { UpdateTodoRequest } from '../../../requests/UpdateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.TODOS_TABLE


export const dbHandlerUpdate = async (userId:string, todoId: string, updatedTodo: UpdateTodoRequest) => {
    return await docClient.update({
      TableName: table,
      Key: {userId, todoId},
      ...updatedTodo,

    }).promise()
  }

export const dbAttachmentUrlUpdate = async (userId:string, todoId: string, attachmentUrl: string) => {
  return await docClient.update({
    TableName: table,
    Key: {userId, todoId},
    UpdateExpression: "set attachmentUrl = :url",
    ExpressionAttributeValues: {
      ":url": attachmentUrl
    }

  }).promise()
}