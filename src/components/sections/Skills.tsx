import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import AchievementTrigger from '../AchievementTrigger'
import { skills } from '../../data/content'

export default function Skills() {
  return (
    <section id="stack" className="relative bg-void px-6 py-28 md:px-12">
      <AchievementTrigger id="stack" icon="◈" title="Inspected the stack" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" kicker="Stack" title="Tools I reach for" />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-ink p-6"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{group.category}</div>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-mist md:text-[15px]">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
