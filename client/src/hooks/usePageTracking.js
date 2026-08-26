import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'

/**
 * usePageTracking — fires POST /api/track on every route change.
 * Skips /admin routes. Fire-and-forget; never throws.
 */
export default function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    if (path.startsWith('/admin')) return
    apiFetch('/api/track', {
      method: 'POST',
      body: JSON.stringify({ path }),
    }).catch(() => {}) // silently ignore tracking errors
  }, [location.pathname])
}
