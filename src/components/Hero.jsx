import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(1000px_600px_at_50%_0%,rgba(59,130,246,0.25),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950/80" />
      <div className="absolute -top-10 left-0 right-0 h-[80vh]">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" />
      </div>
      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-200 text-sm backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Live • Futuristic Social Platform
        </div>
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Identity. Creativity. Connection.
        </h1>
        <p className="mt-4 text-blue-200/80 max-w-2xl mx-auto">
          A premium, fluid network for real-time expression — text, voice, video, and AI-powered stories.
        </p>
      </div>
    </section>
  )
}
