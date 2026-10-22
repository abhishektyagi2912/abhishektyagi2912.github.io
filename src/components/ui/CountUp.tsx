import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/** Counts the numeric part of a value like "90+" up from 0 when it scrolls into view. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value
  const hasNumber = match !== null
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || !hasNumber) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, hasNumber])

  return (
    <span ref={ref} className="tabular-nums">
      {hasNumber ? n : ''}
      {suffix}
    </span>
  )
}
