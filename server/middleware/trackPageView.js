import PageView from '../models/PageView.js'

/**
 * trackPageView — lightweight page-view recorder.
 * POST /api/track  { path: '/about-us' }
 * Called from the frontend on every route change.
 */
export async function trackPageView(req, res) {
  try {
    const { path } = req.body
    if (!path || typeof path !== 'string') {
      return res.status(400).json({ error: 'path is required.' })
    }
    // Ignore admin routes
    if (path.startsWith('/admin')) return res.status(204).send()

    await PageView.create({
      path: path.slice(0, 200),
      userAgent: req.headers['user-agent']?.slice(0, 300) ?? '',
      referrer:  req.headers.referer?.slice(0, 300) ?? '',
      ip: (req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').toString().split(',')[0].trim(),
    })
    return res.status(204).send()
  } catch (err) {
    // Never fail a page view
    return res.status(204).send()
  }
}
