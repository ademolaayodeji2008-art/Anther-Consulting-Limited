import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import logo from '../../assets/logo.jpeg'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate  = useNavigate()
  const [form,   setForm]   = useState({ email: '', password: '' })
  const [error,  setError]  = useState('')
  const [loading,setLoading]= useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/admin')
    } catch (err) {
      setError(err.message ?? 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 font-body">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Anther Consulting" className="h-12 object-contain" />
        </div>

        <h1 className="font-heading text-xl font-bold text-navy text-center mb-1">Admin Panel</h1>
        <p className="text-xs text-body text-center mb-6">Sign in to manage the website</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-semibold text-navy">Email</label>
            <input
              id="email" type="email" required autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs font-semibold text-navy">Password</label>
            <input
              id="password" type="password" required autoComplete="current-password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
          )}

          <button
            type="submit" disabled={loading}
            className="bg-primary text-white font-semibold py-3 rounded hover:bg-primary/90 transition-colors disabled:opacity-60 text-sm"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-4 text-xs text-body">
          <a href="/" className="text-primary hover:underline">← Back to website</a>
        </p>
      </div>
    </div>
  )
}
