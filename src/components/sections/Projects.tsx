import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import { projects } from '../../data/content'

export default function Projects() {
  return (
    <section id="projects" className="relative bg-void px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="05" kicker="Open Source" title="From the GitHub archive" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <TiltCard className="glass flex h-full flex-col rounded-2xl border border-line p-6 hover:border-cyan/40">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl text-white">{p.name}</h3>
                  <div className="flex shrink-0 items-center gap-3">
                    {p.stars > 0 && (
                      <span className="flex items-center gap-1 font-mono text-xs text-lime">
                        <Star size={12} fill="currentColor" /> {p.stars}
                      </span>
                    )}
                    <a href={p.link} target="_blank" rel="noreferrer" data-cursor="hover" className="text-mist transition-colors hover:text-cyan">
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-mist">
                      {t}
                    </span>
                  ))}
                </div>

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="mt-4 font-mono text-xs text-cyan hover:underline"
                  >
                    View live →
                  </a>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/abhishektyagi2912"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            View all 90+ repos on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
