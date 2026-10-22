import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import CountUp from '../ui/CountUp'
import { profile, stats } from '../../data/content'

const STATEMENT =
  "I build products end to end — backend systems, clean interfaces, and the animation layer most teams skip. Calm process, code that ships."

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.45'] })
  const words = STATEMENT.split(' ')

  return (
    <section id="about" className="relative bg-paper px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" kicker="About" title="The person behind the commits" />

        <p ref={textRef} className="max-w-5xl font-display text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-ink md:text-5xl">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="space-y-5 text-base leading-relaxed text-muted md:text-lg"
          >
            <p>
              I'm a software developer at <span className="font-medium text-ink">Culture Holidays</span>, where I build the
              backend systems and real-time tooling that keep the product running. Outside of that, I run{' '}
              <span className="font-medium text-ink">TechyznCode</span> — teaching full-stack, AI and system design in plain
              language — and I built <span className="font-medium text-ink">Zenhabicto</span>, a gamified habit app.
            </p>
            <p>
              Across ~90 public repos the pattern repeats: security tooling, accessibility, ML models, Flutter apps, animated
              frontends. "{profile.tagline}"
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-card p-6 md:p-8"
              >
                <div className="font-display text-5xl font-black tracking-[-0.05em] text-ink md:text-6xl">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
