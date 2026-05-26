import { useRef, useState } from 'react'
import LizardViewer from './LizardModel'
import { Button, Badge, Card, confettiSideCannons } from '@kwyw/kayv-glass-ui'

/* ── Memory card data ─────────────────────────────────────── */
const MEMORIES = [
  { image: '/first-date.jpg', caption: 'the beginning 🌷',         label: 'Day 1',  bg: 'linear-gradient(135deg,#fce7f3,#f9a8d4)' },
  { image: null,              caption: 'pure chaos energy 😂',     label: 'Day 7',  bg: 'linear-gradient(135deg,#fef9c3,#fde68a)' },
  { image: null,              caption: 'late night adventures 🌙',  label: 'Day 14', bg: 'linear-gradient(135deg,#ede9fe,#c4b5fd)' },
  { image: null,              caption: 'stolen fries 🍟',           label: 'Day 21', bg: 'linear-gradient(135deg,#d1fae5,#6ee7b7)' },
  { image: null,              caption: 'one whole month 🌹',        label: 'Day 30', bg: 'linear-gradient(135deg,#fee2e2,#fca5a5)' },
]

/* Stack position offsets per layer [front, mid, back] — kept as
   JS values because they're applied to absolute-positioned elements
   whose indices are dynamic at runtime. */
const S_TOP   = [0, 6, 11]
const S_LEFT  = [0, -5, 6]
/* Static string array lets Tailwind scan & generate these classes */
const S_TILTS = ['rotate-[-2deg]', 'rotate-[2.5deg]', 'rotate-[-1.5deg]']

/* ── Stats & reward data ──────────────────────────────────── */
const STATS = [
  { emoji: '💬', label: 'Texts sent',               value: '4,321+', accent: '#7c3aed' },
  { emoji: '😂', label: 'Inside jokes made',         value: '42',     accent: '#db2777' },
  { emoji: '🍟', label: 'Times you stole my fries',  value: '11',     accent: '#d97706' },
  { emoji: '💭', label: 'Times I missed you',         value: '24/7',   accent: '#0891b2' },
]

const REWARD_ITEMS = [
  ['🌅', 'Sunset to remember',    'A golden hour picnic at a spot we both love.'],
  ['🍓', 'Your favourite things', 'All your snacks, drinks & the playlist you made.'],
  ['🎬', 'Our movie night',       "Blankets, fairy lights & the one you've been wanting."],
  ['💌', 'Something handwritten', 'Because some things deserve to be real.'],
  ['📸', 'One photo for forever', 'The first of many anniversary pictures. 💕'],
]

/* The pink gradient shared by both CTA buttons */
const PINK_GRADIENT = 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)'

/* ══════════════════════════════════════════════════════════════
   PAGE 1 — COVER
   ══════════════════════════════════════════════════════════════ */
function CoverSection({ onOpen }) {
  return (
    <section className="min-h-[100svh] bg-gradient-to-br from-pink-50 via-fuchsia-50 to-orange-50 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-pink-300/30 blur-[64px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-orange-300/20 blur-[72px] pointer-events-none" />

      <div className="text-center z-10 max-w-[340px] w-full">
        <div className="text-[3.5rem] mb-6 animate-float">🌸</div>

        <p className="font-playfair italic text-[0.8rem] tracking-[0.25em] text-pink-800/80 uppercase mb-2.5">
          A Love Story
        </p>

        <h1 className="font-playfair font-bold text-[2.3rem] leading-[1.15] text-pink-700 mb-1">
          The Chronicles of Us
        </h1>

        <p className="font-playfair italic text-2xl text-pink-600 mb-3">
          Volume One
        </p>

        <div className="mb-12">
          <Badge variant="primary" size="md">
            21 April – 21 May, 2026 &nbsp;·&nbsp; 30 Days
          </Badge>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onOpen}
          className="btn-pulse text-white border-pink-300/40"
          style={{ background: PINK_GRADIENT }}
        >
          <span className="text-2xl">💖</span>
          Open with Love
        </Button>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE 2 — MEMORY CARD STACK
   ══════════════════════════════════════════════════════════════ */
function MemorySection({ sectionRef }) {
  const [idx,      setIdx]      = useState(0)
  const [flipping, setFlipping] = useState(null) // null | 'left' | 'right'
  const dragStart = useRef(null)
  const n = MEMORIES.length

  const goNext = () => {
    if (flipping || idx >= n - 1) return
    setFlipping('left')
    setTimeout(() => { setIdx(i => i + 1); setFlipping(null) }, 480)
  }
  const goPrev = () => {
    if (flipping || idx === 0) return
    setFlipping('right')
    setTimeout(() => { setIdx(i => i - 1); setFlipping(null) }, 480)
  }

  const onDragStart = e => { dragStart.current = e.touches ? e.touches[0].clientX : e.clientX }
  const onDragEnd   = e => {
    if (dragStart.current === null) return
    const diff = dragStart.current - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX)
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev()
    dragStart.current = null
  }

  const visible = Math.min(3, n - idx)
  const stack   = Array.from({ length: visible }, (_, i) => ({ mem: MEMORIES[idx + i], pos: i }))

  return (
    <section
      ref={sectionRef}
      className="min-h-[100svh] bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="text-center max-w-xs mb-7">
        <Badge variant="warning" size="sm">Chapter One</Badge>
        <h2 className="font-playfair font-bold text-[1.55rem] text-orange-900 leading-snug mt-2.5">
          Day 1: Where the chaos started... 💖
        </h2>
      </div>

      {/* Card stack */}
      <div
        className="relative w-[250px] h-[370px] cursor-grab select-none"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        {[...stack].reverse().map(({ mem, pos }) => {
          const isFront = pos === 0
          return (
            <div
              key={`${idx}-${pos}`}
              className="absolute"
              style={{
                top:             S_TOP[pos],
                left:            S_LEFT[pos],
                zIndex:          3 - pos,
                animation:       isFront && flipping
                  ? `flip${flipping === 'left' ? 'Left' : 'Right'} 0.48s cubic-bezier(0.45,0,1,1) forwards`
                  : 'none',
                transformOrigin: flipping === 'left' ? '8% center' : '92% center',
              }}
            >
              {/* Polaroid */}
              <div className={[
                'bg-white p-3 pb-[50px] w-[250px] relative',
                isFront
                  ? 'shadow-[0_14px_40px_rgba(0,0,0,0.16),0_3px_10px_rgba(0,0,0,0.08)]'
                  : 'shadow-[0_6px_18px_rgba(0,0,0,0.10)]',
                S_TILTS[pos],
              ].join(' ')}>
                {/* Day stamp */}
                <span className="absolute top-2 right-3 font-lato text-[0.62rem] tracking-[0.1em] text-orange-700 opacity-70 uppercase">
                  {mem.label}
                </span>

                {/* Photo */}
                <div className="w-full aspect-square overflow-hidden" style={{ background: mem.bg }}>
                  {mem.image && (
                    <img src={mem.image} alt={mem.caption} className="w-full h-full object-cover block" />
                  )}
                </div>

                {/* Caption */}
                <p className="font-playfair italic text-center text-orange-900 text-[0.85rem] mt-2.5 leading-snug">
                  {mem.caption}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-6 justify-center">
        {MEMORIES.map((_, i) => (
          <div
            key={i}
            className="h-[7px] rounded-full transition-all duration-300"
            style={{
              width:      i === idx ? 18 : 7,
              background: i === idx ? '#c2410c' : 'rgba(194,65,12,0.22)',
            }}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="font-lato text-[0.67rem] text-orange-800/45 mt-2.5 tracking-[0.12em] uppercase">
        {idx < n - 1 ? '← swipe to turn the page →' : '✦ the end of chapter one ✦'}
      </p>

      {/* Quote */}
      <p className="font-lato text-center max-w-[295px] mt-7 text-amber-900 leading-[1.75] text-[0.97rem]">
        "The exact moment I realized I was completely in trouble —
        <span className="font-playfair italic text-orange-700"> the best kind.</span>"
      </p>

      {/* Scroll cue */}
      <div className="mt-8 text-center opacity-45">
        <p className="text-[1.6rem] leading-none">↓</p>
        <p className="font-lato text-[0.68rem] tracking-[0.18em] text-orange-900 uppercase mt-1">
          Scroll to continue
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE 3 — STATS
   ══════════════════════════════════════════════════════════════ */
function StatsSection() {
  return (
    <section className="min-h-[100svh] bg-gradient-to-br from-violet-50 via-pink-100 to-pink-50 flex flex-col items-center justify-center px-5 py-12">
      <div className="text-center mb-8 max-w-xs">
        <Badge variant="primary" size="sm">One Month In</Badge>
        <h2 className="font-playfair font-bold text-[1.75rem] text-violet-950 mt-2.5">
          Our Stats ✨
        </h2>
        <p className="font-lato text-violet-700 text-sm mt-1">
          Empirically proven. Scientifically{' '}
          <span className="font-playfair italic">us</span>.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 w-full max-w-[360px]">
        {STATS.map(s => (
          <Card
            key={s.label}
            variant="elevated"
            padding="md"
            className="animate-fadeup flex items-center gap-4"
          >
            <span className="text-[2rem] leading-none shrink-0">{s.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-lato text-xs text-gray-500 mb-0.5 truncate">{s.label}</p>
              <p
                className="font-lato text-[1.55rem] font-bold leading-none"
                style={{ color: s.accent }}
              >
                {s.value}
              </p>
            </div>
            {/* Accent bar — color is dynamic per stat */}
            <div
              className="w-1 h-[42px] rounded-full opacity-45 shrink-0"
              style={{ background: s.accent }}
            />
          </Card>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE 4 — LETTER & CONFETTI REWARD
   ══════════════════════════════════════════════════════════════ */
function LetterSection() {
  const [revealed, setRevealed] = useState(false)

  const handleReward = () => {
    confettiSideCannons()
    setRevealed(true)
  }

  return (
    <section className="min-h-[100svh] bg-gradient-to-b from-yellow-50 via-amber-50 to-pink-50 flex flex-col items-center justify-start px-5 pt-12 pb-28">
      <div className="text-center mb-6 max-w-xs">
        <Badge variant="warning" size="sm">A Love Letter</Badge>
        <h2 className="font-playfair font-bold text-[1.75rem] text-amber-900 mt-2.5">
          One Month. Always. 🌹
        </h2>
      </div>

      {/* Letter card — parchment gradient kept as style since Tailwind
          arbitrary color values would be very verbose here */}
      <Card
        variant="elevated"
        padding="lg"
        className="max-w-[360px] w-full mb-7"
        style={{
          background:   'linear-gradient(180deg, #fdf6ee 0%, #fefaf5 100%)',
          borderColor:  'rgba(180,120,60,0.2)',
        }}
      >
        <div className="text-center text-[1.3rem] tracking-[0.35em] mb-5">🌸 · 🌿 · 🌸</div>

        <p className="font-playfair italic text-[1.1rem] text-amber-800 mb-4">My Darling,</p>

        <div className="font-lato text-[0.95rem] text-amber-900 leading-[1.85] flex flex-col gap-3.5">
          <p>{"It's only been a month — and yet here we are, thirty days deep into something that already feels like home."}</p>
          <p>{"You came into my life and turned everything up to eleven. The laughter, the late-night chaos, the warmth of knowing you're just a text away."}</p>
          <p>{"You steal my fries, flood my notifications, and somehow make every single ordinary moment feel extraordinary. I wouldn't change a second of it."}</p>
          <p className="font-playfair italic text-[1.05rem] text-pink-700 text-center py-2">
            "You are my favourite distraction, my best adventure, and the exact kind of trouble I never want to get out of."
          </p>
          <p>Happy One Month, love. 💕</p>
          <p className="text-right italic opacity-65">— Yours 🌷</p>
        </div>

        <div className="h-px bg-amber-900/10 my-5" />

        <p className="font-lato text-sm text-amber-800 text-center opacity-80">
          P.S. Tap the button below — you've{' '}
          <span className="font-playfair italic">absolutely</span> earned it. 🌸
        </p>
      </Card>

      {/* CTA — hidden after first tap */}
      {!revealed && (
        <Button
          variant="primary"
          size="lg"
          onClick={handleReward}
          className="animate-glow text-white border-pink-300/40 mb-6"
          style={{ background: PINK_GRADIENT }}
        >
          🎁 Tap for your 1-Month Reward
        </Button>
      )}

      {/* Revealed anniversary plans */}
      {revealed && (
        <Card
          variant="elevated"
          padding="md"
          className="animate-slide-down max-w-[360px] w-full"
        >
          <h3 className="font-playfair font-bold text-center text-pink-700 text-[1.25rem] mb-5">
            🎉 Your Anniversary Surprise 🎉
          </h3>

          <div className="flex flex-col gap-4">
            {REWARD_ITEMS.map(([icon, title, desc]) => (
              <div key={title} className="flex gap-3.5 items-start">
                <span className="text-[1.4rem] shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="font-lato font-bold text-gray-800 text-[0.95rem] leading-snug">{title}</p>
                  <p className="font-lato text-gray-500 text-[0.83rem] mt-0.5 leading-[1.55]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 pt-4 border-t border-pink-200/60">
            <p className="font-playfair italic text-pink-700">Coming soon — just for you 💕</p>
          </div>
        </Card>
      )}
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   ROOT APP
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const memoryRef = useRef(null)

  return (
    <>
      <div className="h-[100svh] overflow-y-auto overflow-x-hidden">
        <CoverSection
          onOpen={() => memoryRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
        <MemorySection sectionRef={memoryRef} />
        <StatsSection />
        <LetterSection />
      </div>
      <LizardViewer />
    </>
  )
}
