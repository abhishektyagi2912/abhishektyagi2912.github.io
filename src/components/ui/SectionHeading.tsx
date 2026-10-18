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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6"
    >
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{kicker}</div>
        <h2 className="mt-3 font-display text-4xl font-semibold text-white md:text-6xl">{title}</h2>
      </div>
      <div className="font-mono text-sm text-mist/50 md:text-base">{index}</div>
    </motion.div>
  )
}
