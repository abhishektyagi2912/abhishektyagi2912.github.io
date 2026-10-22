const WORDS = ['React', 'Next.js', 'Node.js', 'Flutter', 'AI / ML', 'AWS', 'System Design', 'TypeScript', 'Docker', 'Three.js']

export default function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-5 text-paper">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-bold tracking-tight md:text-4xl">
            {w}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
