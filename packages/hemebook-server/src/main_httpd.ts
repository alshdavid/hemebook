import * as http from 'node:http'
import { server } from './server.ts'

http.createServer(server).listen(3000, '0.0.0.0', () => {
  console.log('listening on http://localhost:3000')
})
