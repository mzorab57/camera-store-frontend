import { useEffect, useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://adnanshops.com/api'

function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      components={{
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="rounded-lg my-2 max-w-full max-h-48 object-contain bg-gray-50 border" onError={e => e.target.style.display = 'none'} />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3"><table className="text-xs border-collapse w-full border border-gray-300">{children}</table></div>
        ),
        th: ({ children }) => <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-left font-semibold">{children}</th>,
        td: ({ children }) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'سڵاو لە Adnan Shop! چۆن دەتوانم یارمەتیت بدەم؟' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  useEffect(() => {
  const el = textareaRef.current
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}, [input])

  // لە سەرەوەی return، پێش handleKeyDown
const handleSend = async () => {
  const trimmed = input.trim()
  if (!trimmed || loading) return        // ← ئەمە گەیشتپێکراوە، دووجار نانێردرێت

  const newMessages = [...messages, { role: 'user', content: trimmed }]
  setMessages(newMessages)
  setInput('')
  setLoading(true)                       // ← loading=true دەکات، پاشان disabled دەبێت

  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })
    if (!res.ok) throw new Error('Server error')
    const data = await res.json()
    if (data?.success) {
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || '' }])
    } else {
      throw new Error(data?.error)
    }
  } catch (error) {
    console.error("Fetch error:", error)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'ببوورە، پەیوەندییەکە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.'
    }])
  } finally {
    setLoading(false)
  }
}

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-2xl w-full mx-auto flex flex-col flex-1 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        
        <div className="bg-gray-900 p-4 text-white flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-lg font-semibold">Adnan Shop Smart Assistant</h1>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm ${m.role === 'assistant' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                <p className="text-xs font-bold mb-1 opacity-60">{m.role === 'assistant' ? 'Assistant' : 'You'}</p>
                {m.role === 'assistant' ? <MarkdownMessage content={m.content} /> : <p className="whitespace-pre-wrap">{m.content}</p>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl text-gray-400 text-sm flex gap-1 items-center animate-pulse">● ● ●</div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2">
           <textarea
  ref={textareaRef}          // ← ئەمە زیاد بکە
  value={input}
  onChange={e => setInput(e.target.value)}
  onKeyDown={handleKeyDown}
  disabled={loading}
  placeholder="پرسیارەکەت لێرە بنووسە..."
  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100 resize-none transition-all text-sm"
  rows={1}
  style={{ maxHeight: '120px', overflowY: 'auto' }}   // ← ئەمەش زیاد بکە
/>
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-xl transition-all"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}