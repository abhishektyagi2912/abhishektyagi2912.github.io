import { useEffect, useRef } from 'react'
import { useAchievements } from '../context/AchievementContext'

export default function AchievementTrigger({ id, icon, title }: { id: string; icon: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { unlock } = useAchievements()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) unlock(id, icon, title)
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id, icon, title, unlock])

  return <div ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-1/3 h-px w-px" />
}
