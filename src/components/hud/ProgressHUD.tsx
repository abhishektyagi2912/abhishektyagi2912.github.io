import { motion } from 'framer-motion'
import { useScrollMeta } from '../../hooks/useScrollMeta'
import { SECTIONS } from '../../data/sections'

export default function ProgressHUD() {
  const { progress, activeIndex, level, total } = useScrollMeta()

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[55] h-[3px] bg-line/60">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan via-violet-bright to-lime shadow-[0_0_10px_rgba(94,234,212,0.6)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="pointer-events-none fixed left-4 top-20 z-[55] hidden flex-col items-start gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/70 lg:flex">
        <span className="text-cyan">LVL {level}/{total}</span>
        <span>{SECTIONS[activeIndex]?.title}</span>
      </div>

      <nav className="fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor="hover"
            className="group flex items-center gap-3"
          >
            <span className="whitespace-nowrap rounded-md border border-line bg-void/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-mist opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-all duration-300 ${
                i === activeIndex
                  ? 'scale-125 border-cyan bg-cyan shadow-[0_0_10px_rgba(94,234,212,0.8)]'
                  : i < activeIndex
                    ? 'border-violet bg-violet/60'
                    : 'border-line bg-transparent'
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  )
}
