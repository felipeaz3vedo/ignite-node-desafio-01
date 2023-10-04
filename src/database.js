import fs from 'node:fs/promises'

const databasePath = new URL('../database/db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  selectAll(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  selectOne(table, id) {
    let data = this.#database[table] ?? []

    const [response] = data.filter((field) => field.id === id)

    return response
  }

  insert(table, data) {
    const tableAlreadyExists = Array.isArray(this.#database[table])

    tableAlreadyExists
      ? this.#database[table].push(data)
      : (this.#database[table] = [data])

    this.#persist()
  }

  update(table, id, data) {
    console.log(`table: ${table}, id: ${id}, data: ${data}`)
    const rowIndex = this.#database[table].findIndex((data) => data.id === id)

    if (rowIndex > -1) {
      const task = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = {
        ...task,
        title: data.title || task.title,
        description: data.description || task.description,
        completedAt: data.completedAt,
        updatedAt: new Date()
      }

      this.#persist()

      return 'Success'
    }

    return 'Resource not found.'
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()

      return 'Success'
    }

    return 'Resource not found.'
  }
}
