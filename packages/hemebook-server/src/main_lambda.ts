import { server } from './server.ts'
import { type LambdaEvent, type LambdaResponse } from './platform/lambda.ts'
import { type Request } from './platform/http.ts'

export async function handler(
  event: LambdaEvent
): Promise<LambdaResponse> {
  const request: Request = ({
    url: event.rawPath,
    headers: event.headers
  })

  if (event.rawQueryString) {
    request.url += '?'
    request.url += event.rawQueryString
  }

  if (event.cookies) {
    request.headers.cookie = event.cookies.join(';')
  }

  const lambda_response: LambdaResponse = ({
    isBase64Encoded: false,
    statusCode: 200,
    headers: {},
    cookies: [],
    multiValueHeaders: {},
    body: ''
  })

  const response = /** @type {import('./platform/http.js').Response} */ ({
    get statusCode() {
      return lambda_response.statusCode
    },

    set statusCode(value) {
      lambda_response.statusCode = value
    },

    end() {},

    write(data: string) {
      lambda_response.body += data
    },

    setHeader(key: string, headers: string[] | string) {
      if (typeof headers === 'string') {
        if (lambda_response.headers) {
          lambda_response.headers[key] = headers
        }
      } else {
        if (key.toLowerCase() === 'set-cookie') {
          lambda_response.cookies?.push(...headers)
        }
      }
    },
  })

  await server(request, response)
  return lambda_response
}
