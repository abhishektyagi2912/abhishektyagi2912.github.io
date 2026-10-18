import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Toast = { key: number; icon: string; title: string }

const AchievementContext = createContext<{ unlock: (id: string, icon: string, title: string) => void } | null>(null)

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const seen = useRef<Set<string>>(new Set())
  const keyRef = useRef(0)

  const unlock = useCallback((id: string, icon: string, title: string) => {
    if (seen.current.has(id)) return
    seen.current.add(id)
    const key = keyRef.current++
    setToasts((t) => [...t, { key, icon, title }])
    window.setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.key !== key))
    }, 3200)
  }, [])

  return (
    <AchievementContext.Provider value={{ unlock }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[90] flex flex-col gap-3 md:bottom-8 md:right-8">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="glass flex items-center gap-3 rounded-xl border border-cyan/40 px-4 py-3 shadow-[0_0_24px_rgba(94,234,212,0.15)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-violet/20 text-lg">
                {t.icon}
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">Achievement unlocked</div>
                <div className="font-display text-sm text-white">{t.title}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AchievementContext.Provider>
  )
}

export function useAchievements() {
  const ctx = useContext(AchievementContext)
  if (!ctx) throw new Error('useAchievements must be used within AchievementProvider')
  return ctx
}
