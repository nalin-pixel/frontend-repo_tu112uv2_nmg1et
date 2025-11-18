import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Feed from './components/Feed'
import AuthSheet from './components/AuthSheet'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <Feed />
      <AuthSheet />
      <footer className="mt-24 py-8 text-center text-slate-400">Built for deep human connection • Futuristic, fluid, fast</footer>
    </div>
  )
}

export default App
