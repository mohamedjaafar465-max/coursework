// db.js - one SQLite file, created on first start. sql.js is SQLite compiled to
// WebAssembly, so no native build tools are needed. All queries are synchronous
// once init() has finished.
const fs = require('node:fs')
const path = require('node:path')
const initSqlJs = require('sql.js')

const DB_PATH = path.join(__dirname, 'tasks.sqlite')
let db = null

// Write the in-memory database back to the single file after every change.
function save() {
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()))
}

async function init() {
  const SQL = await initSqlJs()
  const existed = fs.existsSync(DB_PATH)
  db = existed ? new SQL.Database(fs.readFileSync(DB_PATH)) : new SQL.Database()

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      completed  INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
      created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      updated_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `)
  if (!existed) save() // make sure the file exists right away
}

function all(sql, params = []) {
  const statement = db.prepare(sql)
  statement.bind(params)
  const rows = []
  while (statement.step()) rows.push(statement.getAsObject())
  statement.free()
  return rows
}

function run(sql, params = []) {
  db.run(sql, params)
  save()
}

// Convert a SQLite row (integer 0/1) into the JSON shape the UI expects.
function toTask(row) {
  return {
    id: row.id,
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function getTask(id) {
  const row = all('SELECT * FROM tasks WHERE id = ?', [id])[0]
  return row ? toTask(row) : null
}

module.exports = {
  init,
  toTask,
  listTasks: () => all('SELECT * FROM tasks ORDER BY id ASC').map(toTask),
  getTask,
  createTask: (title) => {
    run('INSERT INTO tasks (title) VALUES (?)', [title])
    const { id } = all('SELECT last_insert_rowid() AS id')[0]
    return getTask(id)
  },
  renameTask: (id, title) => {
    run(
      "UPDATE tasks SET title = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?",
      [title, id]
    )
    return db.getRowsModified() > 0
  },
  setCompletion: (id, completed) => {
    run(
      "UPDATE tasks SET completed = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?",
      [completed ? 1 : 0, id]
    )
    return db.getRowsModified() > 0
  },
  deleteTask: (id) => {
    run('DELETE FROM tasks WHERE id = ?', [id])
    return db.getRowsModified() > 0
  },
}
