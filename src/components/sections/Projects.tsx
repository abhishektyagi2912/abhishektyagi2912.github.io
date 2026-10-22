import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/content'

export default function Projects() {
  return (
    <section id="projects" className="relative bg-card px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="05" kicker="Open source" title="From the GitHub archive" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group flex min-h-[260px] flex-col rounded-3xl border border-line bg-paper p-7 transition-[background,box-shadow] duration-300 hover:bg-card hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.03em] text-ink">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                {p.stars > 0 && (
                  <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-ink">
                    <Star size={12} fill="currentColor" className="text-accent" /> {p.stars}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://github.com/abhishektyagi2912"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            All 90+ repos on GitHub
            <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  )
}
