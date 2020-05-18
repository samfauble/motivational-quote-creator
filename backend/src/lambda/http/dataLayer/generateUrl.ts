import * as AWS from 'aws-sdk'
//import { UpdateQuoteRequest } from '../../../requests/UpdateQuoteRequest'

//const docClient = new AWS.DynamoDB.DocumentClient()
//const table = process.env.QUOTES_TABLE
const s3 = new AWS.S3({
    signatureVersion: "v4"
  })

export const signURL = (bucket: string, quoteId: string, urlExpiration: number) => {
    
    return s3.getSignedUrl('putObject', {
      Bucket: bucket,
      Key: quoteId,
      Expires: urlExpiration
    })
}