import { NavLink, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

const NAV = [
  { to: '/admin',             label: 'Dashboard',   icon: '⊞', end: true },
  { to: '/admin/blog',        label: 'Blog Posts',  icon: '✎' },
  { to: '/admin/contacts',    label: 'Contacts',    icon: '✉' },
  { to: '/admin/subscribers', label: 'Subscribers', icon: '◉' },
  { to: '/admin/settings',    label: 'Settings',    icon: '⚙' },
]

export default function AdminLayout({ children }) {
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div className="min-h-screen flex bg-gray-100 font-body">

      {/* Sidebar */}
      <aside className="w-56 bg-navy flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-white font-heading font-bold text-sm tracking-widest uppercase">Anther</p>
          <p className="text-white/50 text-xs tracking-wider">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2">
          {NAV.map(({ to, label, icon, end }) => (
            <NavLink
              key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary text-white font-semibold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/80 text-xs truncate mb-2">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-white/50 hover:text-white transition-colors"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>

    </div>
  )
}
