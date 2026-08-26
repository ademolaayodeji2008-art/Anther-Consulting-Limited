import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/**
 * requireAuth — JWT bearer token middleware.
 * Attach to any route that requires an authenticated admin.
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided.' })
    }
    const token = authHeader.slice(7)
    const secret = process.env.JWT_SECRET
    if (!secret) {
      return res.status(500).json({ error: 'JWT_SECRET is not configured.' })
    }
    const payload = jwt.verify(token, secret)
    const user = await User.findById(payload.id).select('-password')
    if (!user) return res.status(401).json({ error: 'User not found.' })
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}
