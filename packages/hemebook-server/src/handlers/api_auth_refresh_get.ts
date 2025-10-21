import * as http from 'node:http'
import { parseCookie } from '../platform/cookies.ts'
import { refresh } from '../platform/cognito.ts'
import { type Request, type Response } from '../platform/http.ts'

export async function api_auth_refresh_get(
  _url: URL,
  req: Request,
  res: Response,
) {
  const cookie = parseCookie(req.headers.cookie)
  if (!cookie.auth_refresh_token) {
    res.statusCode = 400
    res.end()
    return
  }

  const result = await refresh(cookie.auth_refresh_token)
  const [,payload_enc,] = result.id_token.split('.')
  const payload = JSON.parse(atob(payload_enc))

  res.setHeader('Set-Cookie', [
    `auth_id_token=${result.id_token}; SameSite=Strict; Path=/api; HttpOnly; Expires=${new Date(payload.exp * 1000).toUTCString()}`,
  ])

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({
    email: payload.email,
    auth_time: payload.auth_time,
    email_verified: payload.email_verified,
    exp: payload.exp,
  }, null, 2))
  res.end()
}
