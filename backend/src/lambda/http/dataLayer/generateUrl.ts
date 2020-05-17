import * as AWS from 'aws-sdk'
//import { UpdateTodoRequest } from '../../../requests/UpdateTodoRequest'

//const docClient = new AWS.DynamoDB.DocumentClient()
//const table = process.env.TODOS_TABLE
const s3 = new AWS.S3({
    signatureVersion: "v4"
  })

export const signURL = (bucket: string, todoId: string, urlExpiration: number) => {
    
    return s3.getSignedUrl('putObject', {
      Bucket: bucket,
      Key: todoId,
      Expires: urlExpiration
    })
}