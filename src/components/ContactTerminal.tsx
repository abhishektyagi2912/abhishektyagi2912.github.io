import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export default function ContactTerminal() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-[#070910] text-left shadow-[0_0_80px_rgba(94,234,212,0.08)]"
    >
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-mist/60">guest@abhishektyagi — zsh</span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 p-6 font-mono text-sm md:p-8">
        <div className="text-mist">
          <span className="text-lime">guest@portfolio</span>
          <span className="text-mist/50">:~$</span> ./send-message.sh
        </div>

        {status === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-cyan/30 bg-cyan/5 p-5 text-cyan"
          >
            ✓ message queued — {ACCESS_KEY ? 'delivered to abhishek' : 'your email client should be open'}. expect a
            reply within 24–48h.
          </motion.div>
        ) : (
          <>
            <Field label="--name" value={name} onChange={setName} placeholder="Jane Doe" required />
            <Field label="--email" value={email} onChange={setEmail} placeholder="jane@company.com" type="email" required />
            <div>
              <label className="mb-1.5 block text-cyan">--message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="What are we building?"
                className="w-full resize-none rounded-lg border border-line bg-void/60 px-4 py-3 text-white placeholder:text-mist/40 focus:border-cyan focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-7 py-3 text-void transition-transform hover:scale-105 disabled:opacity-60"
            >
              {status === 'sending' ? 'sending...' : 'run ./send.sh'}
            </button>

            {status === 'error' && (
              <div className="text-sm text-red-400">
                Something broke on my end —{' '}
                <button type="button" onClick={fallbackMailto} className="underline">
                  click here to email me directly
                </button>
                .
              </div>
            )}

            {!ACCESS_KEY && (
              <div className="text-xs text-mist/40">
                Form backend not yet configured — submitting will open your email client instead.
              </div>
            )}
          </>
        )}
      </form>
    </motion.div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-cyan">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-line bg-void/60 px-4 py-3 text-white placeholder:text-mist/40 focus:border-cyan focus:outline-none"
      />
    </div>
  )
}
