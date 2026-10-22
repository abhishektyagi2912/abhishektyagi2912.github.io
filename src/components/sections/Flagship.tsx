import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { flagshipProjects } from '../../data/content'

const THEMES = [
  { card: 'bg-ink text-paper', muted: 'text-paper/60', chip: 'border-paper/20 text-paper/80', btn: 'bg-paper text-ink' },
  { card: 'bg-sand text-ink', muted: 'text-muted', chip: 'border-ink/15 text-ink/70', btn: 'bg-ink text-paper' },
  { card: 'bg-card text-ink border border-line', muted: 'text-muted', chip: 'border-line text-ink/70', btn: 'bg-ink text-paper' },
]

type Project = (typeof flagshipProjects)[number]

function StackCard({ p, i, total }: { p: Project; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // earlier cards shrink slightly as the next one slides over them
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.03])
  const t = THEMES[i % THEMES.length]

  return (
    <div ref={ref} className="sticky h-[78vh] min-h-[520px]" style={{ top: `calc(5.5rem + ${i * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className={`flex h-full origin-top flex-col justify-between overflow-hidden rounded-[28px] p-7 md:rounded-[36px] md:p-12 ${t.card}`}
      >
        <div className="flex items-start justify-between gap-6">
          <span className={`text-sm font-semibold tabular-nums ${t.muted}`}>
            ({String(i + 1).padStart(2, '0')}/{String(total).padStart(2, '0')})
          </span>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-transform hover:scale-105 ${t.btn}`}
          >
            Visit
            <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <div>
          <h3 className="font-display text-[14vw] font-black leading-[0.85] tracking-[-0.06em] md:text-[8.5vw]">{p.name}</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <div className="text-lg font-semibold md:text-2xl">{p.tagline}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className={`rounded-full border px-3 py-1 text-[12px] ${t.chip}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className={`text-[15px] leading-relaxed md:text-base ${t.muted}`}>{p.description}</p>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Flagship() {
  return (
    <section id="work" className="relative bg-paper px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" kicker="Selected work" title="Things I built end to end" />

        <div className="space-y-[12vh]">
          {flagshipProjects.map((p, i) => (
            <StackCard key={p.id} p={p} i={i} total={flagshipProjects.length} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted">+ many more live projects — client work, so repos stay private.</p>
      </div>
    </section>
  )
}
