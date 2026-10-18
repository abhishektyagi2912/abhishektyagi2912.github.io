import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import AchievementTrigger from '../AchievementTrigger'
import { flagshipProjects } from '../../data/content'

const accentMap: Record<string, { text: string; border: string; glow: string }> = {
  cyan: { text: 'text-cyan', border: 'hover:border-cyan/60', glow: 'from-cyan/20' },
  violet: { text: 'text-violet-bright', border: 'hover:border-violet/60', glow: 'from-violet/20' },
}

export default function Flagship() {
  return (
    <section id="work" className="relative bg-ink px-6 py-28 md:px-12">
      <AchievementTrigger id="work" icon="★" title="Found the flagship builds" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" kicker="Flagship" title="Things I built end to end" />

        <div className="grid gap-8 md:grid-cols-2">
          {flagshipProjects.map((p, i) => {
            const accent = accentMap[p.accent] ?? accentMap.cyan
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <TiltCard
                  className={`glass h-full rounded-3xl border border-line p-8 md:p-10 ${accent.border}`}
                >
                  <div className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${accent.glow} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />

                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-3xl text-white md:text-4xl">{p.name}</h3>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-current ${accent.text}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>

                  <div className={`mt-2 font-mono text-sm ${accent.text}`}>{p.tagline}</div>
                  <p className="mt-5 text-sm leading-relaxed text-mist md:text-base">{p.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mist">
                        {t}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
