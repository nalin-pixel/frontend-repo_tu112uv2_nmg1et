import { useEffect, useState } from 'react'
import API from '../lib/api'

export default function AuthSheet() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email_or_handle: '', password: '', name: '', handle: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onOpen = () => setOpen(true)
    document.addEventListener('open-auth', onOpen)
    return () => document.removeEventListener('open-auth', onOpen)
  }, [])

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email_or_handle: form.email_or_handle.trim(), password: form.password }) })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.access_token) {
          localStorage.setItem('token', data.access_token)
          setOpen(false)
          window.location.reload()
        } else {
          setError(data.detail || 'Could not sign in. Please check your credentials.')
        }
      } else {
        if (!form.handle || !form.name || !form.email_or_handle || !form.password) {
          setError('Please fill all fields')
          return
        }
        const res = await fetch(`${API}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ handle: form.handle.trim(), name: form.name.trim(), email: form.email_or_handle.trim(), password: form.password }) })
        const data = await res.json().catch(() => ({}))
        if (res.ok && data.access_token) {
          localStorage.setItem('token', data.access_token)
          setOpen(false)
          window.location.reload()
        } else {
          setError(data.detail || 'Could not create your account. Try a different handle or email.')
        }
      }
    } catch (e) {
      setError('Network error. Please try again.')
    } finally { setLoading(false) }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-slate-900 border-l border-white/10 p-6">
        <div className="text-white font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</div>
        <form onSubmit={submit} className="mt-4 space-y-3">
          {mode === 'signup' && (
            <>
              <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Handle" value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value })} />
              <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </>
          )}
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder={mode==='login'?'Email or handle':'Email'} value={form.email_or_handle} onChange={e => setForm({ ...form, email_or_handle: e.target.value })} />
          <input type="password" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button disabled={loading} className="w-full bg-sky-500 text-white rounded-lg py-2">{loading? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}</button>
        </form>
        <div className="mt-3 text-sm text-slate-300">
          {mode === 'login' ? (
            <button className="underline" onClick={() => setMode('signup')}>Create an account</button>
          ) : (
            <button className="underline" onClick={() => setMode('login')}>Already have an account? Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}
