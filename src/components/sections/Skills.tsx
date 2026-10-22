import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { skills } from '../../data/content'

export default function Skills() {
  return (
    <section id="stack" className="relative bg-paper px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" kicker="Stack" title="Tools I reach for" />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              <div className="flex items-baseline gap-3 border-b border-ink pb-3">
                <span className="text-[11px] tabular-nums text-muted">0{i + 1}</span>
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-ink">{group.category}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="cursor-default rounded-full border border-line bg-card px-3 py-1.5 text-[13px] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
