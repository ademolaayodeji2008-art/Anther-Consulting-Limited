/**
 * seedBlog.js — migrate existing blog.json posts into MongoDB.
 * Safe to run multiple times — skips slugs that already exist.
 *
 * Usage:  node server/scripts/seedBlog.js
 */
import 'dotenv/config'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import Blog from '../models/Blog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uri = process.env.DATABASE_URL
if (!uri) { console.error('DATABASE_URL not set'); process.exit(1) }

await mongoose.connect(uri, { dbName: 'anther' })
console.log('[Seed] Connected to MongoDB')

const posts = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'blog.json'), 'utf8')
)

let created = 0, skipped = 0
for (const post of posts) {
  const exists = await Blog.findOne({ slug: post.slug })
  if (exists) { skipped++; continue }
  await Blog.create({
    slug:      post.slug,
    title:     post.title,
    category:  post.category,
    excerpt:   post.excerpt,
    content:   post.content,
    image:     post.image,
    author:    post.author,
    date:      new Date(post.date),
    published: true,
    views:     0,
  })
  created++
  console.log(`[Seed] Created: ${post.slug}`)
}
console.log(`[Seed] Done — ${created} created, ${skipped} skipped.`)

await mongoose.disconnect()
process.exit(0)
