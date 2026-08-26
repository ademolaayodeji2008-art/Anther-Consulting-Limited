/**
 * seedAdmin.js — run once to create the first admin user.
 *
 * Usage:
 *   node server/scripts/seedAdmin.js
 *
 * The script reads ADMIN_EMAIL and ADMIN_PASSWORD from environment variables
 * (or uses safe defaults for local dev). Set them in .env before running.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'

const uri = process.env.DATABASE_URL
if (!uri) { console.error('DATABASE_URL not set'); process.exit(1) }

await mongoose.connect(uri, { dbName: 'anther' })
console.log('[Seed] Connected to MongoDB')

const email    = process.env.ADMIN_EMAIL    ?? 'admin@antherconsulting.com.ng'
const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!'
const name     = process.env.ADMIN_NAME     ?? 'Site Administrator'

const existing = await User.findOne({ email })
if (existing) {
  console.log(`[Seed] Admin already exists: ${email}`)
  await mongoose.disconnect()
  process.exit(0)
}

await User.create({ name, email, password, role: 'admin' })
console.log(`[Seed] Admin created: ${email}`)
console.log(`[Seed] Password: ${password}`)
console.log('[Seed] IMPORTANT: Change this password after first login.')

await mongoose.disconnect()
process.exit(0)
