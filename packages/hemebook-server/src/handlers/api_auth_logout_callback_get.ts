import * as http from 'node:http'
import { parse_req_url } from '../platform/req.ts'
import { type Request, type Response } from '../platform/http.ts'

export async function api_auth_logout_callback_get(
  url: URL,
  req: Request,
  res: Response,
) {
  let location = '/'

  const state = url.searchParams.get('state')
  if (state) {
    location += `?state=${state}`
  }

  res.setHeader('Set-Cookie', [
    `auth_refresh_token=null; SameSite=Strict; Path=/api/auth/refresh; HttpOnly; Expires=${new Date(0).toUTCString()}`,
    `auth_refresh_valid=null; SameSite=Strict; Path=/; Expires=${new Date(0).toUTCString()}`,
    `auth_payload=null; SameSite=Strict; Path=/; Expires=${new Date(0).toUTCString()}`,
    `auth_id_token=null; SameSite=Strict; Path=/api; HttpOnly; Expires=${new Date(0).toUTCString()}`,
  ])

  res.setHeader('Location', location)
  res.statusCode = 307
  res.end()
}
