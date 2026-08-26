import mongoose from 'mongoose'

let connected = false

export async function connectDB() {
  if (connected) return
  const uri = process.env.DATABASE_URL
  if (!uri) {
    console.error('[DB] DATABASE_URL is not set. MongoDB will not connect.')
    return
  }
  try {
    await mongoose.connect(uri, { dbName: 'anther', serverSelectionTimeoutMS: 8000 })
    connected = true
    console.log('[DB] Connected to MongoDB Atlas')
  } catch (err) {
    console.error('[DB] Connection failed:', err.message)
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    } else {
      console.warn('[DB] Running without database — API routes requiring MongoDB will fail.')
    }
  }
}

export default mongoose
