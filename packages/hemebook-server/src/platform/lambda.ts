export type LambdaEvent = {
  version: string
  routeKey: string
  rawPath: string
  rawQueryString: string
  cookies: string[]
  headers: Record<string, string>
  requestContext: lambdaRequestContext
  isBase64Encoded: boolean
}

export type LambdaResponse = {
  isBase64Encoded: boolean
  statusCode: number
  headers?: Record<string, string>
  multiValueHeaders?: Record<string, string[]>
  cookies?: string[]
  body?: string
}

export type LambdaRequestContextHttp = {
  method: string
  path: string
  protocol: string
  sourceIp: string
  userAgent: string
}


export type lambdaRequestContext = {
  accountId: string
  apiId: string
  domainName: string
  domainPrefix: string
  http: LambdaRequestContextHttp
  requestId: string
  routeKey: string
  stage: string
  time: string
  timeEpoch: string
}
