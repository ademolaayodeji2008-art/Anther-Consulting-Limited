import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

import { connectDB } from './utils/db.js'
import newsletterRoutes from './routes/newsletter.js'
import contactRoutes    from './routes/contact.js'
import blogRoutes       from './routes/blog.js'
import adminRoutes      from './routes/admin.js'
import { trackPageView } from './middleware/trackPageView.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = process.env.PORT || 5000

// ── Connect DB ────────────────────────────────────────────────────────────────
await connectDB()

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',').map((o) => o.trim()).filter(Boolean)

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true)
    if (allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: origin '${origin}' not allowed`))
  },
  credentials: true,
}))

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Public API ────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', service: 'Anther Consulting API', timestamp: new Date().toISOString() })
)

app.post('/api/track', trackPageView)

app.use('/api/newsletter', newsletterRoutes)
app.use('/api/contact',    contactRoutes)
app.use('/api/blog',       blogRoutes)

// ── Admin API — origin-restricted + protected by JWT ─────────────────────────
// ADMIN_ORIGIN: the domain/URL where the admin panel is deployed.
// In dev this is http://localhost:5173 (same as client).
// In production set it to e.g. https://admin.antherconsulting.com.ng
// Any request to /api/admin from a different origin is rejected at the
// network level before it even reaches the JWT middleware.
const adminOrigin = process.env.ADMIN_ORIGIN ?? null

app.use('/api/admin', (req, res, next) => {
  const origin = req.headers.origin ?? req.headers.referer ?? ''

  // In production, enforce origin restriction
  if (process.env.NODE_ENV === 'production' && adminOrigin) {
    const originOk = origin.startsWith(adminOrigin)
    if (!originOk) {
      // Return generic 404 — don't reveal the admin API exists
      return res.status(404).json({ error: 'Route not found' })
    }
  }
  next()
}, adminRoutes)

// ── Serve Vite build in production ───────────────────────────────────────────
const distPath = join(__dirname, '..', 'client', 'dist')
if (process.env.NODE_ENV === 'production' && existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Route not found' })
    res.sendFile(join(distPath, 'index.html'))
  })
} else {
  app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))
}

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Anther Consulting API running on http://localhost:${PORT}`)

  // ── Keep-alive ping (free Render tier) ─────────────────────────────────────
  // Pings the health endpoint every 14 minutes to prevent the free instance
  // from spinning down (Render spins down after 15 minutes of inactivity).
  // Only runs in production so it doesn't pollute local dev logs.
  if (process.env.NODE_ENV === 'production') {
    const SELF_URL = process.env.RENDER_EXTERNAL_URL ?? `http://localhost:${PORT}`
    setInterval(() => {
      fetch(`${SELF_URL}/api/health`)
        .then(() => console.log('[Keep-alive] ping OK'))
        .catch((e) => console.warn('[Keep-alive] ping failed:', e.message))
    }, 14 * 60 * 1000) // every 14 minutes
  }
})
export default app
