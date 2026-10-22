import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AvatarDesk } from './avatar/Avatar'

const YEAR = String(new Date().getFullYear())
const STATUS = ['brewing coffee', 'compiling projects', 'fixing one last bug', 'pushing to prod']

/** Calls onDone as soon as the counter hits 100, so the page mounts underneath while the curtain lifts. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 3000
    let raf: number
    let timeout: number

    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / duration)
      // ease-in-out so the counter lingers a beat in the middle, like a real load
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        timeout = window.setTimeout(() => {
          setHidden(true)
          onDone()
        }, 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
  }, [onDone])

  const status = STATUS[Math.min(STATUS.length - 1, Math.floor(progress / 26))]

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-paper"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex items-center justify-between px-5 pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted md:px-10 md:pt-7">
            <span className="text-ink">Abhishek Tyagi</span>
            <span>Portfolio ©{YEAR.slice(-2)}</span>
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 w-[240px] -translate-x-1/2 -translate-y-[58%] md:w-[300px]"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AvatarDesk className="w-full" />
            <div className="mt-3 text-center font-mono text-[11px] text-muted">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle animate-pulse-dot" />
              {status}…
            </div>
          </motion.div>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between md:inset-x-10 md:bottom-8">
            <div className="w-32 md:w-56">
              <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted">Loading</div>
              <div className="h-[2px] w-full overflow-hidden bg-line">
                <div className="h-full bg-ink" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="font-display text-[26vw] font-black leading-[0.8] tracking-[-0.06em] text-ink tabular-nums md:text-[13vw]">
              {progress}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
