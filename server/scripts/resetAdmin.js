/**
 * resetAdmin.js — resets the admin password directly in MongoDB.
 * Usage:  node server/scripts/resetAdmin.js
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'

const uri = process.env.DATABASE_URL
if (!uri) { console.error('DATABASE_URL not set'); process.exit(1) }

await mongoose.connect(uri, { dbName: 'anther' })
console.log('[Reset] Connected to MongoDB')

const email    = process.env.ADMIN_EMAIL    ?? 'admin@antherconsulting.com.ng'
const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!'

const user = await User.findOne({ email })
if (!user) {
  console.log(`[Reset] No user found with email ${email} — creating one...`)
  await User.create({ name: 'Site Administrator', email, password, role: 'admin' })
  console.log(`[Reset] Admin created: ${email} / ${password}`)
} else {
  user.password = password
  await user.save()
  console.log(`[Reset] Password reset for ${email} → ${password}`)
}

await mongoose.disconnect()
process.exit(0)
