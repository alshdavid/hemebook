import * as http from 'node:http'
import { type CognitoJwtVerifier } from "aws-jwt-verify";
import { parseCookie } from '../platform/cookies.ts';
import { type Request, type Response } from '../platform/http.ts'

export async function api_auth_validate(
  _url: URL,
  req: Request,
  res: Response,
  cognitoJwtVerifier: CognitoJwtVerifier<any, any, any>,
) {
  let { auth_id_token } = parseCookie(req.headers.cookie)
  if (!auth_id_token) {
    res.statusCode = 400
    res.end()
    return
  }

  try {
    const payload = await cognitoJwtVerifier.verify(auth_id_token);
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({
      email: payload.email,
      auth_time: payload.auth_time,
      email_verified: payload.email_verified,
      exp: payload.exp,
     }, null, 2))
    res.end()
  } catch (error) {
    res.statusCode = 400
    res.end()
  }
}
