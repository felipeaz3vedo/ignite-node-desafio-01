import http from 'node:http'
import * as dotenv from 'dotenv'

dotenv.config()

import { json } from './middlewares/json.js'
import { taskRoutes } from './routes/task-routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = taskRoutes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(process.env.PORT)
