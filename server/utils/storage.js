/**
 * storage.js — lightweight file-based persistence.
 * Stores records as a JSON array in /server/data/<collection>.json
 * Drop-in replacement for a real DB until one is wired up.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')

// Ensure data directory exists
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

function filePath(collection) {
  return join(DATA_DIR, `${collection}.json`)
}

function readAll(collection) {
  const fp = filePath(collection)
  if (!existsSync(fp)) return []
  try {
    return JSON.parse(readFileSync(fp, 'utf8'))
  } catch {
    return []
  }
}

function writeAll(collection, records) {
  writeFileSync(filePath(collection), JSON.stringify(records, null, 2), 'utf8')
}

export function insert(collection, record) {
  const records = readAll(collection)
  const entry = { id: Date.now(), createdAt: new Date().toISOString(), ...record }
  records.push(entry)
  writeAll(collection, records)
  return entry
}

export function getAll(collection) {
  return readAll(collection)
}

export function getBy(collection, field, value) {
  return readAll(collection).find((r) => r[field] === value) ?? null
}

export function seed(collection, records) {
  // Only seeds if the collection is empty
  if (readAll(collection).length === 0) {
    writeAll(collection, records)
  }
}
