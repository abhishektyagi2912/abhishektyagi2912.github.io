import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 md:px-12 ${
        scrolled ? 'glass' : ''
      }`}
    >
      <a href="#top" className="font-display text-sm font-semibold tracking-wide text-white" data-cursor="hover">
        AT<span className="text-cyan">.</span>dev
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor="hover"
            className="font-mono text-xs uppercase tracking-[0.15em] text-mist transition-colors hover:text-cyan"
          >
            {l.label}
          </a>
        ))}
        <a
          href="mailto:abhishektyagi2912@gmail.com"
          data-cursor="hover"
          className="rounded-full border border-cyan/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-cyan transition-colors hover:bg-cyan hover:text-void"
        >
          Hire me
        </a>
      </nav>

      <button
        className="z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={`h-px w-6 bg-white transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
        <span className={`h-px w-6 bg-white transition-transform ${open ? '-translate-y-[1px] -rotate-45' : ''}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-full flex flex-col gap-5 border-b border-line bg-void/98 px-6 py-8 backdrop-blur-xl md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-xl text-white"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
