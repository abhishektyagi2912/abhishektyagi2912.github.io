import { useEffect, useId, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/*
 * Illustrated, animated avatar of Abhishek — drawn from a reference photo:
 * wavy dark hair, black rectangular glasses, full beard, cream tee under a
 * charcoal blazer, watch + orange kalava on the right wrist.
 *
 * Two poses:
 *  - <AvatarWave />  standing, waving, holding a coffee (hero)
 *  - <AvatarDesk />  sitting at a round table on a laptop (preloader)
 *
 * The wave uses SMIL so it pivots exactly at the elbow; everything else is
 * CSS (see .av-* in index.css). Both respect prefers-reduced-motion.
 */

const C = {
  skin: '#E0A982',
  skinLight: '#EDBB95',
  skinShade: '#C98D66',
  skinDeep: '#A96E4E',
  hair: '#1E1511',
  hairHi: '#41302699',
  beard: '#2B1F19',
  shirt: '#F2E8C8',
  shirtShade: '#DED1A8',
  shirtDeep: '#C4B68A',
  jeans: '#2F3646',
  jeansShade: '#232836',
  blazer: '#2C2F36',
  blazerShade: '#212328',
  lapel: '#3A3E47',
  glasses: '#141414',
}

function useGradients() {
  const id = useId().replace(/:/g, '')
  return {
    skin: `av-skin-${id}`,
    shirt: `av-shirt-${id}`,
    jeans: `av-jeans-${id}`,
    laptop: `av-laptop-${id}`,
    table: `av-table-${id}`,
    blazer: `av-blazer-${id}`,
  }
}

function Defs({ g }: { g: ReturnType<typeof useGradients> }) {
  return (
    <defs>
      <radialGradient id={g.skin} cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor={C.skinLight} />
        <stop offset="55%" stopColor={C.skin} />
        <stop offset="100%" stopColor={C.skinShade} />
      </radialGradient>
      <linearGradient id={g.shirt} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FAF2D8" />
        <stop offset="60%" stopColor={C.shirt} />
        <stop offset="100%" stopColor={C.shirtShade} />
      </linearGradient>
      <linearGradient id={g.jeans} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3A4256" />
        <stop offset="100%" stopColor={C.jeansShade} />
      </linearGradient>
      <linearGradient id={g.blazer} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3A3E47" />
        <stop offset="55%" stopColor={C.blazer} />
        <stop offset="100%" stopColor={C.blazerShade} />
      </linearGradient>
      <linearGradient id={g.laptop} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D9DCE2" />
        <stop offset="100%" stopColor="#A3A8B2" />
      </linearGradient>
      <linearGradient id={g.table} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#DCA56E" />
        <stop offset="100%" stopColor="#C2864F" />
      </linearGradient>
    </defs>
  )
}

/** Head drawn around (0,0). Pupils move when `pupilsRef` is driven by the cursor. */
function Head({ g, pupilsRef }: { g: ReturnType<typeof useGradients>; pupilsRef?: React.Ref<SVGGElement> }) {
  return (
    <g className="av-head">
      {/* ears */}
      <ellipse cx={-57} cy={6} rx={10} ry={14} fill={C.skinShade} />
      <ellipse cx={57} cy={6} rx={10} ry={14} fill={C.skinShade} />
      <path d="M-59 0 Q-62 6 -58 13" stroke={C.skinDeep} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M59 0 Q62 6 58 13" stroke={C.skinDeep} strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* face */}
      <path d="M-56 -20 C-56 -64 56 -64 56 -20 L56 10 C56 48 30 74 0 74 C-30 74 -56 48 -56 10 Z" fill={`url(#${g.skin})`} />

      {/* sideburns + beard */}
      <path d="M-57 -14 L-49 -16 L-49 16 L-57 10 Z" fill={C.beard} />
      <path d="M57 -14 L49 -16 L49 16 L57 10 Z" fill={C.beard} />
      <path
        d="M-56 2 C-56 52 -30 84 0 84 C30 84 56 52 56 2 C52 22 45 32 35 37 C23 31 11 29 0 30 C-11 29 -23 31 -35 37 C-45 32 -52 22 -56 2 Z"
        fill={C.beard}
      />
      {/* mustache */}
      <path d="M-22 40 C-13 31 -4 35 0 37 C4 35 13 31 22 40 C14 43 6 42 0 41 C-6 42 -14 43 -22 40 Z" fill="#1A120E" />
      {/* smile */}
      <path d="M-11 49 Q0 59 11 49 Q0 54 -11 49 Z" fill="#B8645A" />

      {/* blush */}
      <ellipse cx={-36} cy={22} rx={8} ry={4.5} fill="#E8846E" opacity={0.3} />
      <ellipse cx={36} cy={22} rx={8} ry={4.5} fill="#E8846E" opacity={0.3} />

      {/* nose */}
      <path d="M-1 4 C-3 14 -9 22 -6 26 C-3 29 3 29 7 26" stroke={C.skinDeep} strokeWidth={2.5} fill="none" strokeLinecap="round" />

      {/* eyes */}
      <g className="av-blink">
        <g ref={pupilsRef} style={{ transition: 'transform 0.15s ease-out' }}>
          <ellipse cx={-25} cy={2} rx={5.5} ry={6.5} fill="#22160F" />
          <ellipse cx={25} cy={2} rx={5.5} ry={6.5} fill="#22160F" />
          <circle cx={-23} cy={0} r={1.9} fill="#fff" />
          <circle cx={27} cy={0} r={1.9} fill="#fff" />
        </g>
      </g>

      {/* eyebrows */}
      <path d="M-41 -20 Q-28 -28 -12 -21" stroke={C.hair} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M12 -21 Q28 -28 41 -20" stroke={C.hair} strokeWidth={5} fill="none" strokeLinecap="round" />

      {/* glasses */}
      <g stroke={C.glasses} strokeWidth={3.5} fill="#ffffff" fillOpacity={0.14}>
        <rect x={-44} y={-12} width={36} height={27} rx={8} />
        <rect x={8} y={-12} width={36} height={27} rx={8} />
      </g>
      <path d="M-8 -2 Q0 -7 8 -2" stroke={C.glasses} strokeWidth={3} fill="none" />
      <path d="M-44 -4 L-56 -7 M44 -4 L56 -7" stroke={C.glasses} strokeWidth={3} strokeLinecap="round" />
      <path d="M-38 -6 L-30 -9 M14 -6 L22 -9" stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.7} />

      {/* hair */}
      <path
        d="M-60 -8 C-70 -46 -60 -86 -30 -98 C-8 -108 22 -108 42 -96 C66 -82 72 -46 60 -8 C58 -26 52 -38 44 -44 C38 -36 24 -36 14 -46 C6 -36 -14 -34 -26 -42 C-36 -34 -48 -24 -60 -8 Z"
        fill={C.hair}
      />
      <path d="M-52 -66 C-58 -96 -32 -114 -10 -104 C0 -120 32 -118 40 -100 C58 -98 68 -78 60 -58 Z" fill={C.hair} />
      <path d="M-28 -42 C-18 -60 6 -62 16 -46 C4 -53 -10 -51 -28 -42 Z" fill={C.hair} />
      <g stroke={C.hairHi} strokeWidth={3} fill="none" strokeLinecap="round">
        <path d="M-32 -88 Q-14 -100 4 -92" />
        <path d="M12 -98 Q30 -102 42 -86" />
        <path d="M-48 -58 Q-42 -76 -26 -82" />
        <path d="M30 -70 Q44 -72 52 -56" />
      </g>
    </g>
  )
}

const EASE = '0.45 0 0.55 1'

/** Open right hand, palm to viewer, wrist at (0,0), fingers pointing up (−y), thumb toward +x. */
function OpenHand() {
  return (
    <g>
      <path
        d="M-10 0 C-13 -8 -16 -18 -16 -30 L-16 -44 C-16 -49.5 -8.5 -49.5 -8.5 -44 L-8.5 -35 L-8 -35 L-8 -54 C-8 -59.5 -0.5 -59.5 -0.5 -54 L-0.5 -36 L0 -36 L0 -58 C0 -63.5 7.5 -63.5 7.5 -58 L7.5 -36 L7.75 -36 L7.75 -53 C7.75 -58.5 15.25 -58.5 15.25 -53 L15.25 -25 C19 -28 24 -34 28 -34 C32.5 -34 33.5 -29.5 30.5 -25.5 C25.5 -17.5 20 -10 13 -4 C12 -2 11 0 10 0 Z"
        fill={C.skin}
        stroke={C.skinShade}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <g stroke={C.skinShade} strokeWidth={1.1} fill="none" strokeLinecap="round">
        <path d="M-8.25 -35 L-8.25 -31 M-0.25 -36 L-0.25 -32 M7.6 -36 L7.6 -32" />
        <path d="M-11 -22 Q-2 -19 9 -24" opacity={0.7} />
        <path d="M8 -8 Q12 -14 14 -22" opacity={0.6} />
      </g>
      <g fill={C.skinLight} opacity={0.8}>
        <ellipse cx={-12.25} cy={-45.5} rx={2.4} ry={2} />
        <ellipse cx={-4.25} cy={-55.5} rx={2.4} ry={2} />
        <ellipse cx={3.75} cy={-59.5} rx={2.4} ry={2} />
        <ellipse cx={11.5} cy={-54.5} rx={2.4} ry={2} />
      </g>
    </g>
  )
}

function usePupilFollow(enabled: boolean) {
  const ref = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!enabled || window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)))
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)))
      el.setAttribute('transform', `translate(${dx * 3.5} ${dy * 3})`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])
  return ref
}

export function AvatarWave({ className = '', followCursor = true }: { className?: string; followCursor?: boolean }) {
  const g = useGradients()
  const pupils = usePupilFollow(followCursor)
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 400 620" className={className} role="img" aria-label="Illustration of Abhishek waving and holding a coffee">
      <Defs g={g} />

      <ellipse cx={200} cy={598} rx={118} ry={12} fill="#000" opacity={0.07} />

      {/* legs */}
      <path d="M144 410 L199 414 L195 566 L160 566 Z" fill={`url(#${g.jeans})`} />
      <path d="M201 414 L256 410 L240 566 L205 566 Z" fill={`url(#${g.jeans})`} />
      <path d="M200 426 L200 474" stroke={C.jeansShade} strokeWidth={2} />

      {/* sneakers */}
      <path d="M152 560 L196 560 C202 560 205 571 203 580 L138 580 C134 571 141 560 152 560 Z" fill="#fff" stroke="#DADADA" strokeWidth={1.5} />
      <rect x={136} y={578} width={69} height={9} rx={4} fill="#E6E6E6" />
      <path d="M152 572 Q170 568 186 574" stroke="#111" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M204 560 L248 560 C259 560 266 571 262 580 L197 580 C195 571 198 560 204 560 Z" fill="#fff" stroke="#DADADA" strokeWidth={1.5} />
      <rect x={195} y={578} width={69} height={9} rx={4} fill="#E6E6E6" />
      <path d="M214 574 Q230 568 248 572" stroke="#111" strokeWidth={2.5} fill="none" strokeLinecap="round" />

      <g className="av-breathe">
        {/* neck */}
        <rect x={186} y={196} width={28} height={46} rx={8} fill={C.skinShade} />
        <ellipse cx={200} cy={224} rx={14} ry={5} fill={C.skinDeep} opacity={0.35} />

        {/* torso */}
        <path
          d="M136 250 C160 236 182 232 200 232 C218 232 240 236 264 250 L272 420 C240 431 160 431 128 420 Z"
          fill={`url(#${g.shirt})`}
        />
        <path d="M132 404 C170 414 230 414 268 404" stroke={C.shirtShade} strokeWidth={3} fill="none" />
        <path d="M181 234 Q200 254 219 234" stroke={C.shirtDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M184 236 Q200 248 216 236 Z" fill={C.skinShade} />

        {/* blazer */}
        <path d="M136 250 C150 242 166 236 181 234 L195 332 L188 430 C160 431 140 427 128 420 Z" fill={`url(#${g.blazer})`} />
        <path d="M264 250 C250 242 234 236 219 234 L205 332 L212 430 C240 431 260 427 272 420 Z" fill={`url(#${g.blazer})`} />
        <path d="M181 234 L195 332 L168 286 L176 254 Z" fill={C.lapel} />
        <path d="M219 234 L205 332 L232 286 L224 254 Z" fill={C.lapel} />
        <path d="M195 332 L168 286 M205 332 L232 286" stroke={C.blazerShade} strokeWidth={1.5} />
        <path d="M150 372 L180 372 M220 372 L250 372" stroke={C.blazerShade} strokeWidth={2} strokeLinecap="round" />
        <path d="M181 234 L176 254 L168 286 M219 234 L224 254 L232 286" stroke="#4A4F5A" strokeWidth={1.2} fill="none" strokeLinecap="round" />
        <circle cx={208} cy={360} r={3.5} fill="#15161A" />
        <circle cx={208} cy={392} r={3.5} fill="#15161A" />

        {/* coffee arm (viewer right) */}
        <path d="M258 248 C281 252 297 270 299 302 L270 310 L262 262 Z" fill={C.blazer} />
        <path d="M284 302 L288 348" stroke={C.blazer} strokeWidth={28} strokeLinecap="round" />
        <path d="M288 350 L258 356" stroke={C.blazer} strokeWidth={26} strokeLinecap="round" />

        {/* cup + steam */}
        <g className="av-steam" stroke="#B9B4AA" strokeWidth={3} fill="none" strokeLinecap="round">
          <path d="M228 282 C222 274 234 268 228 258" />
          <path d="M238 284 C232 274 244 266 238 254" />
          <path d="M248 282 C242 274 254 268 248 258" />
        </g>
        <path d="M218 304 L254 304 L249 366 L223 366 Z" fill="#fff" stroke="#E3E3E3" strokeWidth={1.5} />
        <path d="M220 322 L252 322 L250 344 L222 344 Z" fill="#A9774E" />
        <rect x={214} y={296} width={44} height={10} rx={4} fill="#F6F6F6" stroke="#DADADA" strokeWidth={1.5} />
        <rect x={221} y={290} width={30} height={8} rx={3} fill="#EFEFEF" stroke="#DADADA" strokeWidth={1.5} />
        {/* fingers wrapping cup */}
        <g fill={C.skin} stroke={C.skinShade} strokeWidth={1.5}>
          <rect x={222} y={336} width={26} height={9} rx={4.5} />
          <rect x={221} y={345} width={27} height={9} rx={4.5} />
          <rect x={222} y={354} width={25} height={9} rx={4.5} />
        </g>
        <ellipse cx={252} cy={352} rx={13} ry={15} fill={C.skin} />

        {/* waving arm (viewer left) — his right, with watch band + kalava */}
        <path d="M131 276 L101 306" stroke={C.blazer} strokeWidth={30} strokeLinecap="round" />
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 101 306; -13 101 306; 4 101 306; -8 101 306; 0 101 306; 0 101 306"
              keyTimes="0; 0.13; 0.27; 0.39; 0.52; 1"
              calcMode="spline"
              keySplines={`${EASE}; ${EASE}; ${EASE}; ${EASE}; 0 0 1 1`}
              dur="5s"
              repeatCount="indefinite"
            />
          )}
          <path d="M91 236 L89 214" stroke={C.skin} strokeWidth={20} strokeLinecap="round" />
          <path d="M101 306 L92 244" stroke={C.blazer} strokeWidth={27} strokeLinecap="round" />
          <path d="M78 240 L106 236" stroke="#F7F5EF" strokeWidth={4} strokeLinecap="round" />
          {/* watch + kalava */}
          <rect x={76} y={222} width={26} height={10} rx={3} fill="#1A1A1A" transform="rotate(-6 89 227)" />
          <circle cx={89} cy={227} r={5.5} fill="#D9C08A" stroke="#1A1A1A" strokeWidth={1.5} />
          <rect x={78} y={217} width={23} height={3} rx={1.5} fill="#E8692E" transform="rotate(-6 89 218)" />
          <g transform="translate(89 214) scale(1.32)">
            <OpenHand />
          </g>
        </g>
        <path d="M142 248 C120 252 104 268 98 290 L126 302 L140 262 Z" fill={C.blazer} />

        <g transform="translate(200 138)">
          <Head g={g} pupilsRef={pupils} />
        </g>
      </g>
    </svg>
  )
}

export function AvatarDesk({ className = '' }: { className?: string }) {
  const g = useGradients()

  return (
    <svg viewBox="0 0 400 440" className={className} role="img" aria-label="Illustration of Abhishek coding on a laptop">
      <Defs g={g} />

      <ellipse cx={200} cy={428} rx={130} ry={10} fill="#000" opacity={0.07} />

      {/* chair */}
      <rect x={142} y={168} width={116} height={130} rx={20} fill="#2A2A2A" />
      <path d="M150 330 L138 420 M250 330 L262 420" stroke="#2A2A2A" strokeWidth={5} strokeLinecap="round" />
      <rect x={134} y={318} width={132} height={12} rx={6} fill="#333" />

      {/* lower legs + shoes under table */}
      <rect x={166} y={318} width={27} height={86} rx={6} fill={`url(#${g.jeans})`} />
      <rect x={207} y={318} width={27} height={86} rx={6} fill={`url(#${g.jeans})`} />
      <path d="M160 402 L194 402 C198 402 200 410 198 416 L150 416 C147 410 152 402 160 402 Z" fill="#fff" stroke="#DADADA" />
      <path d="M206 402 L240 402 C248 402 253 410 250 416 L202 416 C200 410 202 402 206 402 Z" fill="#fff" stroke="#DADADA" />

      <g className="av-breathe">
        <rect x={188} y={158} width={24} height={32} rx={7} fill={C.skinShade} />
        <path d="M146 196 C168 182 184 180 200 180 C216 180 232 182 254 196 L262 320 L138 320 Z" fill={`url(#${g.shirt})`} />
        <path d="M184 182 Q200 198 216 182" stroke={C.shirtDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M186 184 Q200 194 214 184 Z" fill={C.skinShade} />
        <path d="M146 196 C160 188 172 183 185 182 L196 262 L192 320 L138 320 Z" fill={`url(#${g.blazer})`} />
        <path d="M254 196 C240 188 228 183 215 182 L204 262 L208 320 L262 320 Z" fill={`url(#${g.blazer})`} />
        <path d="M185 182 L196 262 L174 226 L179 200 Z" fill={C.lapel} />
        <path d="M215 182 L204 262 L226 226 L221 200 Z" fill={C.lapel} />
        <path d="M230 238 L248 238 L245 233 L240 240 L235 232 Z" fill="#F7F5EF" />

        {/* arms reaching to keyboard */}
        <path d="M150 212 L140 266" stroke={C.blazer} strokeWidth={26} strokeLinecap="round" />
        <path d="M250 212 L260 266" stroke={C.blazer} strokeWidth={26} strokeLinecap="round" />
        <g className="av-type-l">
          <path d="M140 268 L178 292" stroke={C.blazer} strokeWidth={23} strokeLinecap="round" />
        </g>
        <g className="av-type-r">
          <path d="M260 268 L222 292" stroke={C.blazer} strokeWidth={23} strokeLinecap="round" />
        </g>
        <path d="M152 194 C138 200 132 214 132 234 L160 238 L162 202 Z" fill={C.blazer} />
        <path d="M248 194 C262 200 268 214 268 234 L240 238 L238 202 Z" fill={C.blazerShade} />

        <g transform="translate(200 104) scale(0.82)">
          <g className="av-nod">
            <Head g={g} />
          </g>
        </g>
      </g>

      {/* table */}
      <rect x={194} y={308} width={12} height={104} fill="#222" />
      <ellipse cx={200} cy={414} rx={42} ry={6} fill="#222" />
      <ellipse cx={200} cy={309} rx={120} ry={16} fill="#B37844" />
      <ellipse cx={200} cy={302} rx={120} ry={16} fill={`url(#${g.table})`} />

      {/* laptop (back facing us) */}
      <rect x={140} y={296} width={120} height={7} rx={3} fill="#9DA1AA" />
      <rect x={148} y={228} width={104} height={70} rx={7} fill={`url(#${g.laptop})`} />
      <circle cx={200} cy={262} r={7} fill="#EEF0F3" opacity={0.85} />

      {/* mug */}
      <g className="av-steam" stroke="#B9B4AA" strokeWidth={2.5} fill="none" strokeLinecap="round">
        <path d="M112 270 C108 264 116 260 112 252" />
        <path d="M120 270 C116 262 124 258 120 248" />
      </g>
      <rect x={104} y={276} width={22} height={24} rx={4} fill="#fff" stroke="#DADADA" />
      <path d="M126 282 Q134 288 126 294" stroke="#DADADA" strokeWidth={3} fill="none" />

      {/* plant */}
      <g className="av-sway">
        <ellipse cx={272} cy={268} rx={6} ry={14} fill="#5E9A5A" transform="rotate(-28 272 268)" />
        <ellipse cx={284} cy={262} rx={6} ry={16} fill="#6FAE69" />
        <ellipse cx={296} cy={268} rx={6} ry={14} fill="#5E9A5A" transform="rotate(28 296 268)" />
      </g>
      <path d="M272 280 L296 280 L292 300 L276 300 Z" fill="#E9E4DA" stroke="#D6D0C4" />

      {/* floating code bubble */}
      <g className="av-bubble">
        <rect x={232} y={186} width={40} height={22} rx={11} fill="#111" />
        <text x={252} y={201} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={11} fontWeight={600} fill="#fff">
          {'</>'}
        </text>
      </g>
    </svg>
  )
}
