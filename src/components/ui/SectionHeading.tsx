import { motion } from 'framer-motion'

export default function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string
  title: string
  kicker: string
}) {
  return (
    <div className="mb-14 border-b border-line pb-6 md:mb-20">
      <div className="mb-5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {kicker}
        </span>
        <span>({index})</span>
      </div>
      <h2 className="overflow-hidden pb-[0.1em] font-display text-[11vw] font-black leading-[0.9] tracking-[-0.05em] text-ink md:text-7xl">
        <motion.span
          className="block"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.span>
      </h2>
    </div>
  )
}
