import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.TODOS_TABLE

export const oneTodoQuery = async (todoId: string) => {
    return await docClient.query({
        TableName: table,
        KeyConditionExpression: 'todoId = :todoId',
        ExpressionAttributeValues: {
            ':todoId': todoId
   }
    }).promise()
  }