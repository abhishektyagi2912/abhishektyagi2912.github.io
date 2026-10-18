import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SECTIONS } from '../data/sections'
import { profile } from '../data/content'

type Command = { id: string; label: string; hint: string; action: () => void }

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Command[] = useMemo(
    () => [
      ...SECTIONS.map((s) => ({
        id: `nav-${s.id}`,
        label: `Jump to ${s.title}`,
        hint: 'navigate',
        action: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      {
        id: 'copy-email',
        label: `Copy email — ${profile.email}`,
        hint: 'clipboard',
        action: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: 'open-github',
        label: 'Open GitHub profile',
        hint: 'external',
        action: () => window.open(profile.socials.github, '_blank', 'noreferrer'),
      },
      {
        id: 'open-linkedin',
        label: 'Open LinkedIn profile',
        hint: 'external',
        action: () => window.open(profile.socials.linkedin, '_blank', 'noreferrer'),
      },
      {
        id: 'open-zenhabicto',
        label: 'Launch Zenhabicto',
        hint: 'external',
        action: () => window.open('https://zenhabicto.com', '_blank', 'noreferrer'),
      },
      {
        id: 'open-techyzncode',
        label: 'Launch TechyznCode',
        hint: 'external',
        action: () => window.open('https://techyzncode.com', '_blank', 'noreferrer'),
      },
    ],
    [],
  )

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      if (e.key === '/' && !typing) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const run = (cmd: Command) => {
    cmd.action()
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor="hover"
        className="glass fixed bottom-6 left-6 z-[55] hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-xs text-mist transition-colors hover:border-cyan hover:text-cyan md:flex"
      >
        <span className="text-cyan">/</span> explore
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-start justify-center bg-void/80 px-4 pt-[14vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-xl overflow-hidden rounded-2xl border border-cyan/30 shadow-[0_0_60px_rgba(94,234,212,0.1)]"
            >
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <span className="font-mono text-cyan">&gt;</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, links, actions..."
                  className="w-full bg-transparent font-mono text-sm text-white placeholder:text-mist/50 focus:outline-none"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mist/60">esc</kbd>
              </div>

              <div className="max-h-[50vh] overflow-y-auto no-scrollbar py-2">
                {filtered.length === 0 && (
                  <div className="px-5 py-6 text-center font-mono text-xs text-mist/50">No matches — try something else</div>
                )}
                {filtered.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => run(cmd)}
                    className="flex w-full items-center justify-between px-5 py-3 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="font-mono text-sm text-white">{cmd.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-mist/50">{cmd.hint}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
