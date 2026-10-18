import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1400
    let raf: number

    const tick = () => {
      const elapsed = performance.now() - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setHidden(true), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-mist">Initializing</div>
          <div className="mt-6 font-display text-5xl text-gradient md:text-7xl">
            {progress.toString().padStart(3, '0')}%
          </div>
          <div className="mt-8 h-px w-56 overflow-hidden bg-line">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan to-violet"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-6 font-mono text-[11px] text-mist/70">abhishek tyagi — software developer</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
