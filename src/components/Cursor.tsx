import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let x = 0,
      y = 0,
      rx = 0,
      ry = 0

    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor="hover"]')
      ring.current?.classList.toggle('scale-[1.8]', !!interactive)
      ring.current?.classList.toggle('bg-ink/5', !!interactive)
      ring.current?.classList.toggle('opacity-100', true)
    }

    let raf: number
    const animate = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div ref={dot} className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-ink" />
      {/* Tailwind's scale-* uses the `scale` property, so it composes with the inline translate */}
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-ink/40 opacity-0 transition-[scale,background-color,opacity] duration-300 ease-out"
      />
    </div>
  )
}
