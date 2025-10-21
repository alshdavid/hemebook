import * as http from 'node:http'

export function parse_req_url(
  req: http.IncomingMessage,
) {
  if (!req.url) {
    throw new Error('Unable to parse')
  }

  const [pathname, searchString] = req.url.split('?')

  let searchParams
  if (searchString) {
    searchParams = new URLSearchParams(searchString)
  } else {
    searchParams = new URLSearchParams('')
  }

  return {
    pathname,
    searchParams,
  }
}
