import { useRef, type ReactNode, type MouseEvent } from 'react'

export default function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(0)`
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(94,234,212,0.12), transparent 70%)',
      }}
    >
      {children}
    </div>
  )
}
