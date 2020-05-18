import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.QUOTES_TABLE

export const oneTodoQuery = async (quoteId: string) => {
    return await docClient.query({
        TableName: table,
        KeyConditionExpression: 'quoteId = :quoteId',
        ExpressionAttributeValues: {
            ':quoteId': quoteId
   }
    }).promise()
  }