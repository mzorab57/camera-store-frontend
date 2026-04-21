import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Camera } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://adnanshops.com/api'

function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt}
            className="rounded-lg my-2 max-w-full max-h-40 object-contain bg-white border border-gray-100"
            onError={e => (e.target.style.display = 'none')}
          />
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary font-medium">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-2 rounded-lg border border-gray-200">
            <table className="text-xs border-collapse w-full">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-700">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border-b border-gray-100 px-3 py-1.5 text-gray-600">{children}</td>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="list-none space-y-1 my-1">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-sm flex gap-1.5 items-start">
            <span className="text-primary mt-0.5">•</span>
            <span>{children}</span>
          </li>
        ),
        p: ({ children }) => (
          <p className="mb-1.5 leading-relaxed text-sm">{children}</p>
        ),
        h3: ({ children }) => (
          <h3 className="font-bold text-sm mt-3 mb-1 text-gray-800">{children}</h3>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 text-primary px-1 rounded text-xs">{children}</code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

const SUGGESTIONS = [
  '📷 باشترین کامێرای Canon',
  '💰 کامێرای ژێر $500',
  '🎬 کامێرای ویدیۆ',
  '⚖️ Sony vs Canon',
]

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef             = useRef(null)
  const textareaRef           = useRef(null)
  const inputRef              = useRef(null)

  // ── ئۆتۆ scroll
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  // ── ئۆتۆ resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }, [input])

  // ── focus input کاتێک دەکرێتەوە
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  // ── بەخێرهاتن
  useEffect(() => {
    if (!open || messages.length) return
    setLoading(true)
    fetch(`${API_BASE_URL}/ai/chat.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_start: true })
    })
      .then(r => r.json())
      .then(d => { if (d?.success && d?.reply) setMessages([{ role: 'assistant', content: d.reply }]) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [open])

  // ── Send
  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    const next = [...messages, { role: 'user', content: msg }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const r = await fetch(`${API_BASE_URL}/ai/chat.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      })
      const d = await r.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: d?.reply || 'ببوورە، کێشەیەک هەیە.'
      }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'ببوورە، پەیوەندییەکە سەرکەوتوو نەبوو.' }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const showSuggestions = messages.length <= 1 && !loading

  return (
    <>
      {/* ── FAB Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-gray-800 rotate-0 scale-95'
            : 'bg-gradient-to-br from-primary to-primary hover:scale-110'
        }`}
        aria-label="Toggle chat"
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
      </button>

      {/* ── Chat Window */}
      <div className={`fixed bottom-24 right-6 z-50 w-[370px] max-w-[95vw] transition-all duration-300 origin-bottom-right ${
        open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          style={{ height: '560px' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Adnan Shop AI</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-gray-400 text-[11px]">پسپۆڕی کامێرا و ئامێرەکان</p>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white/80" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">

            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>

                {/* AI Avatar */}
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-primary border border-primary flex items-center justify-center shrink-0 mt-1">
                    <Camera className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}

                <div className={`max-w-[82%] rounded-2xl px-3 py-2.5 shadow-sm ${
                  m.role === 'assistant'
                    ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    : 'bg-gradient-to-br from-primary to-primary text-white rounded-tr-none'
                }`}>
                  {m.role === 'assistant'
                    ? <MarkdownMessage content={m.content} />
                    : <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  }
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary border border-primary flex items-center justify-center shrink-0">
                  <Camera className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 flex gap-1 items-center">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            {/* Suggestion Chips */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => send(s)}
                    className="text-xs bg-white hover:bg-primarytext-gray-700 hover:text-primary border border-gray-200 hover:border-primary rounded-full px-3 py-1.5 transition-all shadow-sm">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex gap-2 items-end bg-gray-50 rounded-xl border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary transition-all px-3 py-2">
              <textarea
                ref={el => { textareaRef.current = el; inputRef.current = el }}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
                placeholder="پرسیارەکەت بنووسە..."
                className="flex-1 bg-transparent outline-none resize-none text-sm text-gray-800 placeholder-gray-400 disabled:opacity-50 leading-relaxed"
                rows={1}
                style={{ maxHeight: '100px', overflowY: 'auto' }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-lg bg-primary hover:bg-primary disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0 mb-0.5"
              >
                {loading
                  ? <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  : <Send className="w-3.5 h-3.5 text-white" />
                }
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Powered by Gemini AI · Adnan Shop
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
