import { useEffect, useState } from 'react'
import { Moon, Sun, Search, Bell, User, LogIn } from 'lucide-react'

export default function Navbar() {
  const [mode, setMode] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode !== 'light')
  }, [mode])

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
        <div className="font-semibold text-white">Vibe</div>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 text-slate-300 hover:text-white"><Search size={18} /></button>
          <button className="p-2 text-slate-300 hover:text-white"><Bell size={18} /></button>
          <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className="p-2 text-slate-300 hover:text-white">
            {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="p-2 text-slate-300 hover:text-white"><User size={18} /></button>
          <button onClick={() => document.dispatchEvent(new CustomEvent('open-auth'))} className="px-3 py-1.5 rounded-lg bg-sky-500 text-white text-sm flex items-center gap-1"><LogIn size={16} /> Sign in</button>
        </div>
      </div>
    </header>
  )
}
