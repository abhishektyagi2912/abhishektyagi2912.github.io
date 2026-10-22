import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'

const YEAR = String(new Date().getFullYear())

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-16 text-paper md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="font-display text-[16vw] font-black uppercase leading-[0.8] tracking-[-0.06em] md:text-[10vw]">
            Abhishek
            <br />
            Tyagi
          </div>
          <a
            href="#top"
            data-cursor="hover"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-paper hover:text-ink"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-paper/15 pt-6 text-[12px] text-paper/50 md:flex-row">
          <span>© {YEAR} {profile.name}. All rights reserved.</span>
          <span>{profile.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
