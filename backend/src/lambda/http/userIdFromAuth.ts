import { APIGatewayProxyEvent } from 'aws-lambda'

export const getUserId = (event: APIGatewayProxyEvent) => {
    const bearer = JSON.stringify(event.headers.Authorization)
    const userId = bearer.split(" ")[1].substr(152, 10)
    return userId
}