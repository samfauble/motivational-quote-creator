import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.QUOTES_TABLE

export const dbHandlerDelete = async (quoteId, userId) => {
    return await docClient.delete({
      TableName: table,
      Key: {userId, quoteId}
    }).promise()
  }