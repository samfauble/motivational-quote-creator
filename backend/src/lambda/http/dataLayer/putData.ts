import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.QUOTES_TABLE
  

export const dbHandlerPut = async (quoteToAdd) => {
  await docClient.put({
    TableName: table,
    Item: quoteToAdd
  }).promise()
}