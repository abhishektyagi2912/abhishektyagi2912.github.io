import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import AchievementTrigger from '../AchievementTrigger'
import { experience } from '../../data/content'

export default function Experience() {
  return (
    <section id="experience" className="relative bg-ink px-6 py-28 md:px-12">
      <AchievementTrigger id="experience" icon="▲" title="Traced the timeline" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="02" kicker="Experience" title="Where the time actually went" />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-violet to-transparent md:left-[9px]" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative pl-10 md:pl-12"
              >
                <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-cyan bg-void md:h-5 md:w-5" />

                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-display text-2xl text-white md:text-3xl">
                    {item.role} <span className="text-mist">·</span>{' '}
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" data-cursor="hover" className="text-gradient underline-offset-4 hover:underline">
                        {item.org}
                      </a>
                    ) : (
                      <span className="text-gradient">{item.org}</span>
                    )}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-mist">{item.period}</span>
                </div>

                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-violet-bright">{item.kind}</div>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mist md:text-base">{item.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mist">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
