import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.TODOS_TABLE

export const dbHandlerDelete = async (todoId, userId) => {
    return await docClient.delete({
      TableName: table,
      Key: {userId, todoId}
    }).promise()
  }