import { COGNITO_CLIENT_ID, COGNITO_ORIGIN, LOCAL_ORIGIN, LOGIN_ENDPOINT } from '../platform/config.ts'
import { type Request, type Response } from '../platform/http.ts'

export async function api_auth_login_get(
  url: URL,
  req: Request,
  res: Response,
) {
  const target = new URL(COGNITO_ORIGIN)
  target.pathname = LOGIN_ENDPOINT
  target.searchParams.set('response_type', 'code')
  target.searchParams.set('client_id', COGNITO_CLIENT_ID)
  target.searchParams.set('redirect_uri', `${LOCAL_ORIGIN}/api/auth/login/callback`)

  const state = url.searchParams.get('state')
  if (state) {
    target.searchParams.set('state',  state)
  }

  res.setHeader('Location', target.toString())
  res.statusCode = 307
  res.end()
}
