import mongoose from 'mongoose'

const pageViewSchema = new mongoose.Schema({
  path:      { type: String, required: true },
  userAgent: { type: String, default: '' },
  referrer:  { type: String, default: '' },
  ip:        { type: String, default: '' },
}, { timestamps: true })

// Index for fast stats queries
pageViewSchema.index({ path: 1 })
pageViewSchema.index({ createdAt: -1 })

export default mongoose.model('PageView', pageViewSchema)
