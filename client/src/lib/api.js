/**
 * api.js — central API base URL resolver.
 *
 * In development: VITE_API_URL is unset, so requests go to '' (same origin),
 * and Vite's dev proxy forwards /api/* to localhost:5000.
 *
 * In production (separate deployments): set VITE_API_URL to your backend URL,
 * e.g. https://anther-api.onrender.com — then all fetch('/api/...') calls
 * become fetch('https://anther-api.onrender.com/api/...').
 */
const API_BASE = import.meta.env.VITE_API_URL ?? ''

export function apiUrl(path) {
  // path should start with /api/...
  return `${API_BASE}${path}`
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  })
  return res
}
