import { type Request, type Response } from '../platform/http.ts'

export async function api_health_check(
  _url: URL,
  _req: Request,
  res: Response,
) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ message: 'healthy' }))
  res.end()
}
