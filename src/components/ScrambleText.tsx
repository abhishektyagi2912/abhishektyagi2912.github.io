import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________01'

export default function ScrambleText({
  text,
  className = '',
  as: Tag = 'span',
  speed = 28,
}: {
  text: string
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3'
  speed?: number
}) {
  const [display, setDisplay] = useState(() =>
    text
      .split('')
      .map((ch) => (ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join(''),
  )
  const ref = useRef<HTMLElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return
          done.current = true

          let frame = 0
          const totalFrames = text.length * 3
          const interval = window.setInterval(() => {
            frame++
            const revealCount = Math.floor((frame / totalFrames) * text.length)
            const next = text
              .split('')
              .map((ch, i) => {
                if (ch === ' ') return ' '
                if (i < revealCount) return text[i]
                return CHARS[Math.floor(Math.random() * CHARS.length)]
              })
              .join('')
            setDisplay(next)
            if (revealCount >= text.length) {
              window.clearInterval(interval)
              setDisplay(text)
            }
          }, speed)
        })
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [text, speed])

  return (
    // @ts-expect-error — dynamic tag ref typing
    <Tag ref={ref} className={className}>
      {display}
    </Tag>
  )
}
