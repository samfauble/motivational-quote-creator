import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { logOperation, generalUseLogger } from "../../utils"
import { signURL } from "../dataLayer/generateUrl"
import { dbAttachmentUrlUpdate } from "../dataLayer/updateData"
import { getUserId } from "../userIdFromAuth"

const bucket = process.env.TODOS_BUCKET
const urlExpiration = process.env.URL_EXPIRATION_TIME

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  //get signed URL
  const num = parseInt(urlExpiration) 
  const signedUrl = signURL(bucket, todoId, num)

  if (!signedUrl) {
    logOperation({signedUrl}, "signing url", false)
  } else {
    logOperation({signedUrl}, "signing url", true)
  }

  const attachmentUrl = `https://${bucket}.s3.amazonaws.com/${todoId}`

  await dbAttachmentUrlUpdate(userId, todoId, attachmentUrl).then(()=>{
    generalUseLogger("Success in updating signed url!!!")
  }).catch((err)=> {
    logOperation(err, "update signed url", false)
  })
  

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({signedUrl})
  }
}
