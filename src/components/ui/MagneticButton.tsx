import { useRef, type ReactNode, type MouseEvent } from 'react'

export default function MagneticButton({
  children,
  href,
  className = '',
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-flex items-center justify-center rounded-full transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  )
}
