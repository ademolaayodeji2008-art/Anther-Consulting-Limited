/**
 * adminApi.js — all admin API calls in one place.
 * Reads the JWT from localStorage and attaches it to every request.
 */
import { apiFetch } from '../../lib/api.js'

function getToken() {
  return localStorage.getItem('admin_token') ?? ''
}

function authFetch(path, options = {}) {
  return apiFetch(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers ?? {}),
    },
  })
}

async function json(res) {
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
  return data
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const adminLogin = (email, password) =>
  apiFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then(json)

export const adminMe = () => authFetch('/api/admin/me').then(json)

export const changePassword = (currentPassword, newPassword) =>
  authFetch('/api/admin/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  }).then(json)

// ── Stats ─────────────────────────────────────────────────────────────────────
export const fetchStats = () => authFetch('/api/admin/stats').then(json)

// ── Blog ──────────────────────────────────────────────────────────────────────
export const fetchAllPosts  = () => authFetch('/api/admin/blogs').then(json)
export const fetchPostById  = (id) => authFetch(`/api/admin/blogs/${id}`).then(json)
export const createPost     = (data) => authFetch('/api/admin/blogs', { method: 'POST', body: JSON.stringify(data) }).then(json)
export const updatePost     = (id, data) => authFetch(`/api/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }).then(json)
export const deletePost     = (id) => authFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' }).then(json)

// ── Contacts ──────────────────────────────────────────────────────────────────
export const fetchContacts       = (params = '') => authFetch(`/api/admin/contacts${params}`).then(json)
export const markRead            = (id) => authFetch(`/api/admin/contacts/${id}/read`, { method: 'PATCH' }).then(json)
export const markReplied         = (id) => authFetch(`/api/admin/contacts/${id}/replied`, { method: 'PATCH' }).then(json)
export const deleteContact       = (id) => authFetch(`/api/admin/contacts/${id}`, { method: 'DELETE' }).then(json)

// ── Subscribers ───────────────────────────────────────────────────────────────
export const fetchSubscribers    = (params = '') => authFetch(`/api/admin/subscribers${params}`).then(json)
export const deleteSubscriber    = (id) => authFetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' }).then(json)
