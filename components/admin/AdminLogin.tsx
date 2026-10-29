'use client'
import { useState } from 'react'
export default function AdminLogin() {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Sign-in failed.')
      window.location.assign('/admin')
    } catch (error) { setError(error instanceof Error ? error.message : 'Could not sign in.'); setBusy(false) }
  }
  return <main className="admin-login"><div className="admin-login-intro"><a href="/" className="admin-eyebrow">← Back to portfolio</a><h1>Your work.<br />Your words.<br /><em>Your space.</em></h1><p>Manage your website, publish new projects, and keep every inquiry in one place.</p></div><form onSubmit={login} className="admin-card"><span className="admin-eyebrow">Portfolio Studio</span><h2>Welcome back</h2><p>Sign in to manage your portfolio.</p><label>Email address<input name="email" type="email" autoComplete="username" required maxLength={254} /></label><label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={256} /></label>{error && <p role="alert" className="admin-error">{error}</p>}<button className="admin-button" disabled={busy}>{busy ? 'Signing in…' : 'Sign in →'}</button><p className="admin-hint">Private access for the portfolio owner. Manage your password through Supabase Authentication.</p></form></main>
}
