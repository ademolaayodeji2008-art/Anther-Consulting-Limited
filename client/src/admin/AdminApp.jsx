import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import AdminRoute    from './components/AdminRoute.jsx'
import AdminLayout   from './components/AdminLayout.jsx'
import AdminLogin    from './pages/AdminLogin.jsx'
import AdminDashboard   from './pages/AdminDashboard.jsx'
import AdminBlog        from './pages/AdminBlog.jsx'
import AdminContacts    from './pages/AdminContacts.jsx'
import AdminSubscribers from './pages/AdminSubscribers.jsx'
import AdminSettings    from './pages/AdminSettings.jsx'

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Public */}
        <Route path="login" element={<AdminLogin />} />

        {/* Protected — all wrapped in AdminLayout */}
        <Route path="*" element={
          <AdminRoute>
            <AdminLayout>
              <Routes>
                <Route index                 element={<AdminDashboard />} />
                <Route path="blog"           element={<AdminBlog />} />
                <Route path="contacts"       element={<AdminContacts />} />
                <Route path="subscribers"    element={<AdminSubscribers />} />
                <Route path="settings"       element={<AdminSettings />} />
                <Route path="*"              element={<Navigate to="/admin" replace />} />
              </Routes>
            </AdminLayout>
          </AdminRoute>
        } />
      </Routes>
    </AdminAuthProvider>
  )
}
