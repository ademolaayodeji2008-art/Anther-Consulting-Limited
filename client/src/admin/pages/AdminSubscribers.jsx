import { useState, useEffect } from 'react'
import { fetchSubscribers, deleteSubscriber } from '../lib/adminApi.js'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(1)
  const [pages,   setPages]   = useState(1)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [removing,setRemoving]= useState(null)

  const load = async (p = 1) => {
    setLoading(true)
    try {
      const d = await fetchSubscribers(`?page=${p}&limit=30`)
      setSubscribers(d.subscribers)
      setTotal(d.total)
      setPages(d.pages)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load(1) }, [])

  const handleRemove = async (id) => {
    try {
      await deleteSubscriber(id)
      setSubscribers(s => s.filter(x => x._id !== id))
      setTotal(t => t - 1)
    } catch (e) { setError(e.message) }
    finally { setRemoving(null) }
  }

  // Build mailto: for broadcasting (opens mail client with all as BCC)
  const allEmails = subscribers.map(s => s.email).join(',')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Newsletter Subscribers</h1>
          <p className="text-sm text-body mt-1">{total} active subscriber{total !== 1 ? 's' : ''}</p>
        </div>
        {subscribers.length > 0 && (
          <a href={`mailto:?bcc=${allEmails}&subject=Anther Consulting Newsletter`}
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-primary/90 transition-colors">
            Email All Subscribers
          </a>
        )}
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-body uppercase hidden sm:table-cell">Subscribed</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscribers.map((s, i) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-body">{(page - 1) * 30 + i + 1}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${s.email}`} className="text-navy hover:text-primary transition-colors">{s.email}</a>
                    </td>
                    <td className="px-4 py-3 text-body hidden sm:table-cell">
                      {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {removing === s._id ? (
                        <span className="flex gap-2 justify-end text-xs">
                          <button onClick={() => handleRemove(s._id)} className="text-red-600 font-semibold">Remove</button>
                          <button onClick={() => setRemoving(null)} className="text-body">Cancel</button>
                        </span>
                      ) : (
                        <button onClick={() => setRemoving(s._id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                      )}
                    </td>
                  </tr>
                ))}
                {!subscribers.length && (
                  <tr><td colSpan={4} className="px-4 py-10 text-center text-body text-sm">No subscribers yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>

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
