import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const table = process.env.QUOTES_TABLE

export const dbHandlerQuery = async (userId) => {
    return await docClient.query({
        TableName: table,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
   }
    }).promise()
  }