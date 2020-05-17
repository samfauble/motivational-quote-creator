import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";
import { createLogger } from "../utils/logger"

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}


export const logOperation = (item, operationName: string, isSuccess: boolean) => {
  const logger = createLogger(`${operationName}`)
  if(isSuccess) {
    return logger.info(`${operationName} succeeded: ${item}`)
  } else {
    return logger.error(`${operationName} failed: ${item}`)
  }
}

export const generalUseLogger = (items) => {
  const logger = createLogger(`info`)
  return logger.info(`${items}`)
}