import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.TODOS_TABLE
  

export const dbHandlerPut = async (todoToAdd) => {
  await docClient.put({
    TableName: table,
    Item: todoToAdd
  }).promise()
}