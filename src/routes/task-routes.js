import { randomUUID } from 'node:crypto'

import { Database } from '../database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const taskRoutes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.selectAll(
        'tasks',
        search ? { title: search, description: search } : null
      )

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completedAt: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end(
        JSON.stringify({
          msg: 'Task created Successfully.'
        })
      )
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const { title, description } = req.body

      const response = database.update('tasks', id, { title, description })

      if (response === 'Success')
        return res.writeHead(200).end(
          JSON.stringify({
            msg: 'Task updated successfully.'
          })
        )

      return res.writeHead(404).end(JSON.stringify({ error: response }))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.selectOne('tasks', id)

      let completedAt = ''

      task.completedAt ? (completedAt = null) : (completedAt = new Date())

      const response = database.update('tasks', id, { completedAt })

      if (response === 'Success')
        return res.writeHead(200).end(
          JSON.stringify({
            msg: 'Task updated successfully.'
          })
        )

      return res.writeHead(404).end(JSON.stringify({ error: response }))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const response = database.delete('tasks', id)

      if (response === 'Success')
        return res.writeHead(200).end(
          JSON.stringify({
            msg: 'Task deleted successfully.'
          })
        )

      return res.writeHead(404).end(JSON.stringify({ error: response }))
    }
  }
]
