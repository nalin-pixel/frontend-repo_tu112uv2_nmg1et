import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Image, Video, Mic, Sparkles, MessageCircle } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function CreatePost({ onCreated, token }) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!content.trim()) return
    setLoading(true)
    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ content })
    })
    setLoading(false)
    if (res.ok) {
      setContent('')
      setOpen(false)
      onCreated?.()
    } else {
      alert('Please sign in to post')
    }
  }

  return (
    <div className="relative">
      <motion.button whileTap={{ scale: 0.96 }} onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl">
        <Plus />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="fixed bottom-16 right-6 z-50 w-96 max-w-[calc(100%-2rem)] rounded-2xl bg-slate-900/90 border border-white/10 p-4 backdrop-blur-lg">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's your vibe?" className="w-full h-28 resize-none bg-transparent outline-none text-white placeholder:text-slate-400" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <button className="p-2 hover:bg-white/5 rounded-lg"><Image size={18} /></button>
                    <button className="p-2 hover:bg-white/5 rounded-lg"><Video size={18} /></button>
                    <button className="p-2 hover:bg-white/5 rounded-lg"><Mic size={18} /></button>
                    <button className="p-2 hover:bg-white/5 rounded-lg"><Sparkles size={18} /></button>
                  </div>
                  <button disabled={loading} onClick={submit} className="px-3 py-1.5 rounded-lg bg-sky-500 text-white disabled:opacity-60">{loading ? 'Posting…' : 'Post'}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Feed() {
  const [items, setItems] = useState([])
  const token = localStorage.getItem('token')

  async function load() {
    const res = await fetch(`${API}/posts`)
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => { load() }, [])

  return (
    <section className="relative max-w-2xl mx-auto px-4 -mt-24">
      <CreatePost onCreated={load} token={token} />
      <div className="space-y-4">
        {items.map((p) => (
          <motion.article key={p._id} initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600" />
              <div>
                <div className="text-white font-medium">{p.author?.name || 'Someone'}</div>
                <div className="text-slate-400 text-sm">@{p.author?.handle || 'user'}</div>
              </div>
            </div>
            {p.content && <p className="mt-3 text-slate-200">{p.content}</p>}
            <div className="mt-3 flex items-center gap-3 text-slate-300">
              <button className="hover:text-white flex items-center gap-1"><MessageCircle size={18} /> Comment</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
