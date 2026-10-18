import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import AchievementTrigger from '../AchievementTrigger'
import { profile, stats } from '../../data/content'

export default function About() {
  return (
    <section id="about" className="relative bg-void px-6 py-28 md:px-12">
      <AchievementTrigger id="about" icon="◇" title="Explored the archive" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" kicker="About" title="The person behind the commits" />

        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-2xl leading-relaxed text-white md:text-3xl">
              "{profile.tagline}" is the line on my GitHub, and it's basically how I work — calm process,
              code that ships.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
              I'm a software developer at <span className="text-cyan">Culture Holidays</span>, where I build
              the backend systems and real-time tooling that keep the product running. Outside of that, I run{' '}
              <span className="text-violet-bright">TechyznCode</span> — my own platform for teaching full-stack
              engineering, AI, and system design in plain language — and I built{' '}
              <span className="text-lime">Zenhabicto</span>, a gamified habit app that's live for people who'd
              rather level up than guilt-trip themselves into consistency.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
              Across ~90 public repos the pattern repeats: security tooling, accessibility, ML models,
              Flutter apps, animated frontends. I like picking something unfamiliar and shipping it anyway.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {['React / Next.js', 'Node.js', 'Python / AI', 'Flutter', 'Three.js / GSAP', 'AWS / Docker'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-mist"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6">
                <div className="font-display text-4xl text-gradient md:text-5xl">{s.value}</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-wider text-mist">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
