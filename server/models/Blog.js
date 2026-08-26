import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  slug:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  title:    { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  excerpt:  { type: String, required: true, trim: true },
  content:  { type: String, required: true },
  image:    { type: String, default: '/src/assets/service-tax.webp' },
  author:   { type: String, default: 'Anther Consulting Team' },
  date:     { type: Date, default: Date.now },
  published:{ type: Boolean, default: true },
  views:    { type: Number, default: 0 },
}, { timestamps: true })

// Auto-generate slug from title if not provided
blogSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

export default mongoose.model('Blog', blogSchema)
