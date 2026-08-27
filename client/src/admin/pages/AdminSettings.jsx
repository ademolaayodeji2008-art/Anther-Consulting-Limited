import { useState } from 'react'
import { changePassword } from '../lib/adminApi.js'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function AdminSettings() {
  const { user } = useAdminAuth()
  const [form, setForm]     = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [msg, setMsg]       = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')

    if (form.newPassword.length < 8) {
      setStatus('error'); setMsg('New password must be at least 8 characters.'); return
    }
    if (form.newPassword !== form.confirmPassword) {
      setStatus('error'); setMsg('New passwords do not match.'); return
    }

    setStatus('loading')
    try {
      await changePassword(form.currentPassword, form.newPassword)
      setStatus('success')
      setMsg('Password changed successfully.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setStatus('error')
      setMsg(err.message ?? 'Failed to change password.')
    }
  }

  const field = (id, label, key) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-navy">{label}</label>
      <input
        id={id} type="password" value={form[key]} required
        onChange={e => set(key, e.target.value)}
        className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )

  return (
    <div className="flex flex-col gap-8 max-w-lg">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy">Settings</h1>
        <p className="text-sm text-body mt-1">Manage your admin account</p>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-navy mb-4">Account</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-body">Name</span>
            <span className="text-navy font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-body">Email</span>
            <span className="text-navy font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-body">Role</span>
            <span className="text-navy font-medium capitalize">{user?.role}</span>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-navy mb-4">Change Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {field('current', 'Current Password', 'currentPassword')}
          {field('new',     'New Password (min 8 characters)', 'newPassword')}
          {field('confirm', 'Confirm New Password', 'confirmPassword')}

          {status === 'success' && (
            <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded px-3 py-2">{msg}</p>
          )}
          {status === 'error' && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">{msg}</p>
          )}

          <button type="submit" disabled={status === 'loading'}
            className="self-start bg-primary text-white font-semibold px-6 py-2.5 rounded text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
            {status === 'loading' ? 'Saving…' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
