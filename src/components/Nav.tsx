import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function useIndiaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const time = useIndiaTime()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled ? 'bg-paper/80 shadow-[0_1px_0_rgba(17,17,17,0.08)] backdrop-blur-xl' : ''
      }`}
    >
      <div className="relative flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <div className="flex items-center gap-6">
          <a href="#top" className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink" data-cursor="hover">
            Abhishek Tyagi
          </a>
          <div className="hidden items-center text-[12px] font-medium tabular-nums text-muted xl:flex">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2fbf71] animate-pulse-dot" />
            {time} IST · India
          </div>
        </div>

        <nav className="hidden items-center justify-end gap-5 lg:flex">
          {LINKS.map((l, i) => (
            <span key={l.href} className="flex items-center gap-5">
              <a
                href={l.href}
                data-cursor="hover"
                className="group relative text-[12px] font-medium uppercase tracking-[0.12em] text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
              {i < LINKS.length - 1 && <span className="text-[12px] text-muted/50">/</span>}
            </span>
          ))}
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper transition-transform hover:scale-105"
          >
            Book a call
          </a>
        </nav>

        <button
          className="z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4 border-b border-line bg-paper px-5 pb-8 pt-2 lg:hidden"
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-3xl font-bold tracking-tight text-ink">
                {l.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 w-fit rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-paper"
            >
              Book a call
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
