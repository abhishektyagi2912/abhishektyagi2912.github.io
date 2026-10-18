import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function KonamiEgg() {
  const [active, setActive] = useState(false)
  const progress = useRef<string[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      progress.current.push(key)
      progress.current = progress.current.slice(-CODE.length)
      if (progress.current.join(',') === CODE.join(',')) {
        setActive(true)
        window.setTimeout(() => setActive(false), 3800)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[99] flex items-center justify-center overflow-hidden bg-void/90"
        >
          <MatrixRain />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative z-10 text-center"
          >
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-lime">Secret level unlocked</div>
            <div className="mt-3 font-display text-4xl text-gradient md:text-6xl">dev.mode = true</div>
            <div className="mt-3 font-mono text-sm text-mist">
              You found the Konami code. Hire this person — they read the source.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = new Array(columns).fill(1)
    const chars = '01{}[]<>/*+-=ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let raf: number
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 6, 10, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#5eead4'
      ctx.font = `${fontSize}px monospace`
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
}
