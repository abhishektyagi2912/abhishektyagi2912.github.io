import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const fallbackMailto = () => {
    const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    if (!ACCESS_KEY) {
      fallbackMailto()
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name,
          email,
          message,
          subject: `Portfolio message from ${name}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-line bg-card p-8 text-left"
      >
        <div className="text-2xl font-bold tracking-tight text-ink">Thanks — message received ✓</div>
        <p className="mt-2 text-muted">
          {ACCESS_KEY ? "It's in my inbox." : 'Your email client should have opened.'} Expect a reply within 24–48h.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 text-left">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Your name" value={name} onChange={setName} placeholder="Jane Doe" />
        <Field label="Email" value={email} onChange={setEmail} placeholder="jane@company.com" type="email" />
      </div>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          placeholder="What are we building?"
          className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent py-3 text-lg text-ink placeholder:text-muted/50 focus:border-ink focus:outline-none"
        />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor="hover"
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-paper transition-transform hover:scale-105 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
        </button>
        {status === 'error' && (
          <span className="text-sm text-red-600">
            Something broke —{' '}
            <button type="button" onClick={fallbackMailto} className="underline">
              email me directly
            </button>
            .
          </span>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-lg text-ink placeholder:text-muted/50 focus:border-ink focus:outline-none"
      />
    </label>
  )
}
