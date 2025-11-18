// Central API base resolver
// Priority: VITE_BACKEND_URL env → window.__BACKEND_URL (from index.html) → fallback to current preview URL
const FALLBACK = 'https://ta-01kabwqhw5fb6ckgbch01715p0-8000.wo-xgl9lgo1vvyrxudpooxa9u38q.w.modal.host'
const API = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && window.__BACKEND_URL) || FALLBACK
export default API
