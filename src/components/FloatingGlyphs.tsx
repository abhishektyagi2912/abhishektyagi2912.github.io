import { useEffect, useRef } from 'react'

const GLYPHS = [
  { text: '</>', top: '8%', left: '6%', speed: 0.12, size: 'text-4xl' },
  { text: '{ }', top: '14%', left: '88%', speed: -0.08, size: 'text-3xl' },
  { text: 'const dev =', top: '34%', left: '4%', speed: 0.06, size: 'text-sm' },
  { text: '=> {}', top: '41%', left: '90%', speed: -0.14, size: 'text-2xl' },
  { text: 'npm run build', top: '52%', left: '3%', speed: 0.1, size: 'text-xs' },
  { text: '0x2F9A', top: '58%', left: '92%', speed: 0.05, size: 'text-xs' },
  { text: 'git push', top: '68%', left: '5%', speed: -0.1, size: 'text-sm' },
  { text: '[AI]', top: '74%', left: '89%', speed: 0.14, size: 'text-2xl' },
  { text: 'await code()', top: '86%', left: '4%', speed: -0.06, size: 'text-xs' },
  { text: '01101000', top: '92%', left: '88%', speed: 0.08, size: 'text-[10px]' },
]

export default function FloatingGlyphs() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        refs.current.forEach((el, i) => {
          if (!el) return
          el.style.transform = `translateY(${y * GLYPHS[i].speed * -0.15}px)`
        })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-2 overflow-hidden">
      {GLYPHS.map((g, i) => (
        <span
          key={g.text}
          ref={(el) => {
            refs.current[i] = el
          }}
          className={`absolute font-mono ${g.size} text-white/5 will-change-transform`}
          style={{ top: g.top, left: g.left }}
        >
          {g.text}
        </span>
      ))}
    </div>
  )
}
