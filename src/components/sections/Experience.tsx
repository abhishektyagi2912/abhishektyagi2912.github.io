import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { experience } from '../../data/content'

export default function Experience() {
  return (
    <section id="experience" className="relative bg-card px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="02" kicker="Experience" title="Where the time went" />

        <div className="border-t border-line">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid gap-4 border-b border-line py-10 transition-colors md:grid-cols-[180px_1fr_auto] md:gap-10 md:px-4 md:hover:bg-paper"
            >
              <div>
                <div className="text-sm font-semibold tabular-nums text-ink">{item.period}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">{item.kind}</div>
              </div>

              <div>
                <h3 className="font-display text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
                  {item.org}
                  <span className="ml-3 align-middle text-base font-medium tracking-normal text-muted">{item.role}</span>
                </h3>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-[12px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  aria-label={`Visit ${item.org}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-paper"
                >
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                </a>
              ) : (
                <span className="hidden md:block md:w-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
