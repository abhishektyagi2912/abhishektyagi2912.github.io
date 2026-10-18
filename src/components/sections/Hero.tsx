import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../scene/HeroScene'
import { profile } from '../../data/content'

const ROLES = ['Software Developer @ Culture Holidays', 'Founder @ TechyznCode', 'Creator of Zenhabicto', 'Builder of 3D & AI things']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative flex min-h-[100vh] items-center overflow-hidden bg-void">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,6,10,0.4)_75%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-cyan"
        >
          Based in India — open to remote work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[13vw] font-semibold leading-[0.95] text-white md:text-[7.5vw]"
        >
          Abhishek
          <br />
          <span className="text-gradient">Tyagi</span>
        </motion.h1>

        <div className="mt-8 flex h-7 items-center gap-2 font-mono text-sm text-mist md:text-base">
          <span className="text-lime">&gt;</span>
          <span key={roleIndex} className="animate-[fadeIn_0.4s_ease]">
            {ROLES[roleIndex]}
          </span>
          <span className="animate-blink text-cyan">_</span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-xl text-base text-mist md:text-lg"
        >
          {profile.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#work"
            data-cursor="hover"
            className="rounded-full bg-gradient-to-r from-cyan to-violet px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-void transition-transform hover:scale-105"
          >
            See the work
          </a>
          <a
            href="#contact"
            data-cursor="hover"
            className="rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">
        <div className="mx-auto mb-2 h-10 w-px bg-gradient-to-b from-cyan to-transparent" />
        Scroll
      </div>
    </section>
  )
}
