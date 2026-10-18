import { useEffect, useState } from 'react'
import { SECTIONS } from '../data/sections'

export function useScrollMeta() {
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeId),
  )

  return { progress, activeId, activeIndex, level: activeIndex + 1, total: SECTIONS.length }
}
