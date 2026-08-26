import { useState, useEffect } from 'react'
import { fetchAllPosts, deletePost, createPost, updatePost, fetchPostById } from '../lib/adminApi.js'

// ── Shared UI ────────────────────────────────────────────────────────────────
function Badge({ published }) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
      published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
    }`}>
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

const CATEGORIES = ['Tax', 'Accounting', 'Audit & Assurance', 'IT & Innovation', 'HR', 'Finance', 'General']
const IMAGES = [
  { label: 'Tax',        value: '/src/assets/service-tax.webp' },
  { label: 'Accounting', value: '/src/assets/service-accounting.webp' },
  { label: 'Audit',      value: '/src/assets/service-audit.webp' },
  { label: 'IT',         value: '/src/assets/service-it.webp' },
]

// ── Post Form (create / edit) ─────────────────────────────────────────────────
const EMPTY = { title: '', category: '', excerpt: '', content: '', image: IMAGES[0].value, author: 'Anther Consulting Team', date: '', published: true }

function PostForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await onSave(form)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const field = (label, key, type = 'text', required = true) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-navy">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input
        type={type} value={form[key]} required={required}
        onChange={e => set(key, e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {field('Title', 'title')}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy">Category *</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} required
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">— select —</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy">Featured Image</label>
          <select value={form.image} onChange={e => set('image', e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            {IMAGES.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field('Author', 'author')}
        {field('Date', 'date', 'date', false)}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-navy">Excerpt *</label>
        <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} required rows={2}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-navy">Content * <span className="font-normal text-body">(use **text** for bold headings)</span></label>
        <textarea value={form.content} onChange={e => set('content', e.target.value)} required rows={12}
          className="border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-y" />
      </div>

      <div className="flex items-center gap-2">
        <input id="published" type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)}
          className="w-4 h-4 accent-primary" />
        <label htmlFor="published" className="text-sm text-navy">Published (visible on website)</label>
      </div>

      {error && <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="bg-primary text-white font-semibold px-6 py-2.5 rounded text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Post'}
        </button>
        <button type="button" onClick={onCancel}
          className="bg-gray-100 text-navy font-semibold px-6 py-2.5 rounded text-sm hover:bg-gray-200 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminBlog() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [view,    setView]    = useState('list')  // 'list' | 'create' | 'edit'
  const [editing, setEditing] = useState(null)
  const [deleting,setDeleting]= useState(null)
  const [error,   setError]   = useState('')

  const load = async () => {
    setLoading(true)
    try { const d = await fetchAllPosts(); setPosts(d.posts) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (form) => {
    await createPost(form)
    await load()
    setView('list')
  }

  const handleUpdate = async (form) => {
    await updatePost(editing._id, form)
    await load()
    setView('list')
    setEditing(null)
  }

  const handleEdit = async (post) => {
    // Fetch full post (with content)
    const { post: full } = await fetchPostById(post._id)
    setEditing({ ...full, date: full.date ? full.date.slice(0, 10) : '' })
    setView('edit')
  }

  const handleDelete = async (id) => {
    try { await deletePost(id); await load() }
    catch (e) { setError(e.message) }
    finally { setDeleting(null) }
  }

  // ── Create / Edit form views
  if (view === 'create') return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setView('list')} className="text-sm text-primary hover:underline">← Back</button>
        <h1 className="font-heading text-xl font-bold text-navy">New Post</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <PostForm onSave={handleCreate} onCancel={() => setView('list')} />
      </div>
    </div>
  )

  if (view === 'edit' && editing) return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button onClick={() => { setView('list'); setEditing(null) }} className="text-sm text-primary hover:underline">← Back</button>
        <h1 className="font-heading text-xl font-bold text-navy">Edit Post</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <PostForm initial={editing} onSave={handleUpdate} onCancel={() => { setView('list'); setEditing(null) }} />
      </div>
    </div>
  )

  // ── List view
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Blog Posts</h1>
          <p className="text-sm text-body mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
        </div>
        <button onClick={() => setView('create')}
          className="bg-primary text-white font-semibold px-5 py-2.5 rounded text-sm hover:bg-primary/90 transition-colors">
          + New Post
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase tracking-wide">Views</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map(post => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-navy max-w-xs truncate">{post.title}</td>
                  <td className="px-4 py-3 text-body">{post.category}</td>
                  <td className="px-4 py-3 text-body whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3"><Badge published={post.published} /></td>
                  <td className="px-4 py-3 text-body">{post.views ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => handleEdit(post)}
                        className="text-xs text-primary hover:underline font-medium">Edit</button>
                      {deleting === post._id ? (
                        <span className="flex gap-2 text-xs">
                          <button onClick={() => handleDelete(post._id)} className="text-red-600 font-semibold">Confirm</button>
                          <button onClick={() => setDeleting(null)} className="text-body">Cancel</button>
                        </span>
                      ) : (
                        <button onClick={() => setDeleting(post._id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!posts.length && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-body text-sm">No posts yet. Create your first one!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
