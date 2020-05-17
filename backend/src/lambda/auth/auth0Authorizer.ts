import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import Axios from 'axios'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
//import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')
//const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}


async function verifyToken(authHeader: string): Promise<JwtPayload> {
  // Get the jwks endpoint
  const jwksUrl = "https://dev-2k4xunuo.auth0.com/.well-known/jwks.json"
  // extract the jwt from the header
  const token = getToken(authHeader)
  // decode the jwt 
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  // get the kid from the JWT header
  const jwtKid = jwt.header.kid
  let cert: string | Buffer

  try{
    //find the signingKey from the filtered JWKS, looking for the matching kid
    const jwks = await Axios.get(jwksUrl);
    const signingKey = jwks.data.keys.filter(k => k.kid === jwtKid)[0]

    if(!signingKey){
      throw new Error("No matching signing key found")
    }

    //create a certificate from the x5c property to be used to verify the JWT
    const {x5c} = signingKey
    cert = `-----BEGIN CERTIFICATE-----\n${x5c[0]}\n-----END CERTIFICATE-----`;
  } catch (error) {
    console.log('Error While getting Certificate : ', error);
  }


  // TODO: Implement token verification
  return verify(token, cert) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
