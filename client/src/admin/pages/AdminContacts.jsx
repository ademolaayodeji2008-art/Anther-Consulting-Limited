import { useState, useEffect } from 'react'
import { fetchContacts, markRead, markReplied, deleteContact } from '../lib/adminApi.js'

function StatusBadge({ read, replied }) {
  if (replied) return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Replied</span>
  if (read)    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Read</span>
  return              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Unread</span>
}

function ContactDetail({ contact, onMarkRead, onMarkReplied, onDelete, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-navy">{contact.subject}</h2>
            <p className="text-xs text-body mt-0.5">
              {new Date(contact.createdAt).toLocaleString('en-GB')}
            </p>
          </div>
          <button onClick={onClose} className="text-body hover:text-navy text-xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-xs text-body">Name</p><p className="font-medium text-navy">{contact.name}</p></div>
          <div><p className="text-xs text-body">Email</p>
            <a href={`mailto:${contact.email}`} className="text-primary hover:underline font-medium">{contact.email}</a>
          </div>
          {contact.phone && (
            <div><p className="text-xs text-body">Phone</p><p className="font-medium text-navy">{contact.phone}</p></div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary">
          <p className="text-sm text-navy leading-relaxed whitespace-pre-wrap">{contact.message}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <a href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
            onClick={onMarkReplied}
            className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            Reply via Email
          </a>
          {!contact.read && (
            <button onClick={onMarkRead}
              className="bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-2 rounded hover:bg-blue-100 transition-colors">
              Mark as Read
            </button>
          )}
          <button onClick={onDelete}
            className="bg-red-50 text-red-600 text-xs font-semibold px-4 py-2 rounded hover:bg-red-100 transition-colors ml-auto">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [total,    setTotal]    = useState(0)
  const [page,     setPage]     = useState(1)
  const [pages,    setPages]    = useState(1)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [selected, setSelected] = useState(null)
  const [unreadOnly, setUnreadOnly] = useState(false)

  const load = async (p = page, uo = unreadOnly) => {
    setLoading(true)
    try {
      const params = `?page=${p}&limit=20${uo ? '&unread=true' : ''}`
      const d = await fetchContacts(params)
      setContacts(d.contacts)
      setTotal(d.total)
      setPages(d.pages)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load(1, unreadOnly) }, [unreadOnly])

  const handleMarkRead = async (id) => {
    await markRead(id)
    setContacts(cs => cs.map(c => c._id === id ? { ...c, read: true } : c))
    if (selected?._id === id) setSelected(s => ({ ...s, read: true }))
  }
  const handleMarkReplied = async (id) => {
    await markReplied(id)
    setContacts(cs => cs.map(c => c._id === id ? { ...c, read: true, replied: true } : c))
    if (selected?._id === id) setSelected(s => ({ ...s, replied: true, read: true }))
  }
  const handleDelete = async (id) => {
    await deleteContact(id)
    setContacts(cs => cs.filter(c => c._id !== id))
    setSelected(null)
    setTotal(t => t - 1)
  }

  return (
    <div className="flex flex-col gap-6">
      {selected && (
        <ContactDetail
          contact={selected}
          onClose={() => setSelected(null)}
          onMarkRead={() => handleMarkRead(selected._id)}
          onMarkReplied={() => handleMarkReplied(selected._id)}
          onDelete={() => handleDelete(selected._id)}
        />
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Contact Messages</h1>
          <p className="text-sm text-body mt-1">{total} message{total !== 1 ? 's' : ''} total</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
          <input type="checkbox" checked={unreadOnly} onChange={e => { setUnreadOnly(e.target.checked); setPage(1) }}
            className="w-4 h-4 accent-primary" />
          Unread only
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase">Subject</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.map(c => (
                  <tr key={c._id}
                    onClick={() => { setSelected(c); if (!c.read) handleMarkRead(c._id) }}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${!c.read ? 'font-semibold' : ''}`}>
                    <td className="px-4 py-3 text-navy">{c.name}</td>
                    <td className="px-4 py-3 text-navy max-w-xs truncate">{c.subject}</td>
                    <td className="px-4 py-3 text-body whitespace-nowrap hidden md:table-cell">
                      {new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3"><StatusBadge read={c.read} replied={c.replied} /></td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={e => { e.stopPropagation(); handleDelete(c._id) }}
                        className="text-xs text-red-400 hover:text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
                {!contacts.length && (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-body text-sm">No messages found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => { setPage(p); load(p) }}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    p === page ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-navy hover:border-primary'
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
