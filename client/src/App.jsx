import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import usePageTracking from './hooks/usePageTracking.js'

import Home        from './pages/Home.jsx'
import About       from './pages/About.jsx'
import Services    from './pages/Services.jsx'
import Blog        from './pages/Blog.jsx'
import BlogPost    from './pages/BlogPost.jsx'
import OurClients  from './pages/OurClients.jsx'
import OurPartners from './pages/OurPartners.jsx'
import Contact     from './pages/Contact.jsx'
import NotFound    from './pages/NotFound.jsx'

// ── Admin: lazy-loaded in a completely separate chunk ─────────────────────────
// This means:
//  1. The admin code is NOT included in the main JS bundle served to visitors
//  2. It only downloads if someone explicitly navigates to /admin
//  3. The route still shows 404 to the public — see AdminGate below
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

/**
 * AdminGate — only renders the admin app when the VITE_ADMIN_ENABLED
 * build flag is set to "true". In production this flag is false, so
 * visiting /admin returns the public 404 page — the admin panel lives
 * at a separate deployment URL (e.g. admin.antherconsulting.com.ng).
 *
 * In development (VITE_ADMIN_ENABLED=true) the panel is accessible at /admin.
 */
const ADMIN_ENABLED = import.meta.env.VITE_ADMIN_ENABLED === 'true'

function AdminGate() {
  if (!ADMIN_ENABLED) return <NotFound />
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdminApp />
    </Suspense>
  )
}

function PublicSite() {
  usePageTracking()
  return (
    <Layout>
      <Routes>
        <Route path="/"                  element={<Home />}        />
        <Route path="/about-us"          element={<About />}       />
        <Route path="/services"          element={<Services />}    />
        <Route path="/blog"              element={<Blog />}        />
        <Route path="/blog/:slug"        element={<BlogPost />}    />
        <Route path="/our-clients"       element={<OurClients />}  />
        <Route path="/partners-and-team" element={<OurPartners />} />
        <Route path="/contact-us"        element={<Contact />}     />
        <Route path="*"                  element={<NotFound />}    />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Admin — gated by VITE_ADMIN_ENABLED, lazy-loaded separate chunk */}
      <Route path="/admin/*" element={<AdminGate />} />

      {/* Public website */}
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  )
}
