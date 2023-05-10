import fs from 'node:fs'
import { parse } from 'csv-parse'
import { randomUUID } from 'node:crypto'
import { Transform, Writable } from 'node:stream'
import { Database } from '../src/database.js'

const database = new Database()

const csvPath = new URL('example.csv', import.meta.url)

const readableStream = fs.createReadStream(csvPath)

const transformStreamToObject = parse({ separator: ';', from_line: 2 })

const transformStreamToJson = new Transform({
  objectMode: true,
  transform(chunk, _, callback) {
    callback(null, JSON.stringify(chunk))
  }
})

const writableStream = new Writable({
  write(chunk, _, callback) {
    const data = JSON.parse(chunk)

    const task = {
      id: randomUUID(),
      title: data[0],
      description: data[1],
      completedAt: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    database.insert('tasks', task)

    callback()
  }
})

readableStream
  .pipe(transformStreamToObject)
  .pipe(transformStreamToJson)
  .pipe(writableStream)
