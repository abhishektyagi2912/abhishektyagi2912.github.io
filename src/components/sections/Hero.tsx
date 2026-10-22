import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { AvatarWave } from '../avatar/Avatar'
import { experience, flagshipProjects, projects } from '../../data/content'

const YEAR = String(new Date().getFullYear())
const ease = [0.22, 1, 0.36, 1] as const

function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const latest = experience.find((e) => e.id === 'zenhabicto')
  const totalProjects = flagshipProjects.length + projects.length

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-paper">
      {/* soft spotlight behind the avatar */}
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[60px]" />

      {/* side labels */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease }}
        className="absolute left-5 top-[38%] z-20 hidden max-w-[180px] md:left-10 md:block"
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Latest</div>
        <div className="mt-2 h-px w-8 bg-ink" />
        {latest && (
          <a href={latest.link} target="_blank" rel="noreferrer" data-cursor="hover" className="mt-3 block text-[12px] leading-snug text-muted hover:text-ink">
            {latest.org} — live on Google Play
          </a>
        )}
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease }}
        className="absolute right-5 top-[38%] z-20 hidden text-right md:right-10 md:block"
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Projects</div>
        <div className="ml-auto mt-2 h-px w-8 bg-ink" />
        <a href="#work" data-cursor="hover" className="mt-3 block text-[12px] text-muted hover:text-ink">
          {String(totalProjects).padStart(2, '0')}+ shipped →
        </a>
      </motion.div>

      {/* avatar */}
      <motion.div
        style={{ y: avatarY, scale: avatarScale }}
        className="absolute bottom-[-2%] left-1/2 z-10 h-[72%] -translate-x-1/2 md:h-[86%]"
      >
        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 60, scale: 0.97, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, delay: 0.2, ease }}
        >
          <AvatarWave className="h-full w-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.08)]" />
        </motion.div>
      </motion.div>

      {/* name */}
      <motion.h1
        style={{ y: nameY }}
        className="absolute bottom-5 left-5 z-20 font-display text-[17vw] font-black uppercase leading-[0.82] tracking-[-0.055em] text-ink md:bottom-8 md:left-10 md:text-[8.6vw]"
      >
        <RevealLine delay={0.5}>Abhishek</RevealLine>
        <RevealLine delay={0.65}>
          Tyagi
          <span className="ml-3 inline-block align-top pt-[0.4em] text-[0.14em] font-semibold tracking-[0.08em] text-muted">
            ©{YEAR}
          </span>
        </RevealLine>
      </motion.h1>

      {/* intro */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease }}
        className="absolute bottom-8 right-10 z-20 hidden max-w-[270px] md:block"
      >
        <p className="text-[13px] leading-relaxed text-muted">
          I'm a software developer at <span className="text-ink">Culture Holidays</span>, founder of{' '}
          <span className="text-ink">TechyznCode</span> and creator of <span className="text-ink">Zenhabicto</span> — building
          products end to end, from backend to the pixels.
        </p>
        <a
          href="#work"
          data-cursor="hover"
          className="group mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink"
        >
          See the work
          <ArrowDownRight size={14} className="transition-transform group-hover:rotate-[-45deg]" />
        </a>
      </motion.div>

      {/* mobile chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute left-1/2 top-20 z-20 -translate-x-1/2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[11px] font-medium text-muted backdrop-blur md:hidden"
      >
        Software Developer · India
      </motion.div>
    </section>
  )
}
