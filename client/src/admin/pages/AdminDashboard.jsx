import { useState, useEffect } from 'react'
import { fetchStats } from '../lib/adminApi.js'

function StatCard({ label, value, sub, color = 'text-primary' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <p className="text-xs text-body uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-heading text-3xl font-bold ${color}`}>{value ?? '—'}</p>
      {sub && <p className="text-xs text-body mt-1">{sub}</p>}
    </div>
  )
}

function SimpleBarChart({ data }) {
  if (!data?.length) return <p className="text-xs text-body">No data yet.</p>
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div className="flex items-end gap-1 h-28">
      {data.map(d => (
        <div key={d.date} className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <div
            className="w-full bg-primary/20 rounded-t relative group"
            style={{ height: `${Math.round((d.count / max) * 96)}px`, minHeight: '4px' }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
              {d.count}
            </div>
            <div className="h-full w-full bg-primary rounded-t opacity-70" />
          </div>
          <span className="text-[9px] text-body truncate w-full text-center">
            {d.date?.slice(5)} {/* MM-DD */}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return <p className="text-red-500 text-sm">{error}</p>

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-body mt-1">Overview of your website activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Blog Posts"    value={stats.totalPosts}       sub="published" />
        <StatCard label="Page Views"    value={stats.totalViews}       sub={`${stats.recentViews} this week`} />
        <StatCard label="Messages"      value={stats.totalContacts}    sub={`${stats.unreadContacts} unread`} color="text-red-500" />
        <StatCard label="Subscribers"   value={stats.totalSubscribers} sub={`${stats.recentSubscribers} this month`} color="text-green-600" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily views chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-navy mb-4">Page Views — Last 30 Days</h2>
          <SimpleBarChart data={stats.dailyViews} />
        </div>

        {/* Top pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-navy mb-4">Top Pages</h2>
          {stats.topPages?.length ? (
            <div className="flex flex-col gap-2">
              {stats.topPages.slice(0, 8).map(p => (
                <div key={p.path} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-body truncate flex-1">{p.path || '/'}</span>
                  <span className="text-xs font-semibold text-navy bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                    {p.count}
                  </span>
                </div>
              ))}
            </div>
          ) : <p className="text-xs text-body">No page views recorded yet.</p>}
        </div>
      </div>
    </div>
  )
}
