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

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    const tableAlreadyExists = Array.isArray(this.#database[table])

    tableAlreadyExists
      ? this.#database[table].push(data)
      : (this.#database[table] = [data])

    this.#persist()
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((data) => data.id === id)

    if (rowIndex > -1) {
      const task = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = {
        ...task,
        title: data.title || task.title,
        description: data.description || task.description,
        completedAt: data.changeTaskState
          ? !task.completedAt
          : task.completedAt,
        updatedAt: new Date()
      }

      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()
    }
  }
}
