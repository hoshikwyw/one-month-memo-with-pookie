import { useRef, useState } from 'react'
import LizardViewer from './LizardModel'

/* ══════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ══════════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');

  .scroll-root {
    height: 100vh;
    height: 100svh;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .serif  { font-family: 'Playfair Display', Georgia, serif; }
  .italic { font-style: italic; }

  @keyframes heartbeat {
    0%,100% { transform: scale(1);    }
    14%     { transform: scale(1.18); }
    28%     { transform: scale(1.02); }
    42%     { transform: scale(1.12); }
    56%     { transform: scale(1);    }
  }
  @keyframes fall {
    from { transform: translateY(-50px) rotate(0deg);   opacity: 1;   }
    to   { transform: translateY(110vh) rotate(600deg); opacity: 0.1; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px);   }
    50%     { transform: translateY(-10px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 18px rgba(236,72,153,0.40); }
    50%     { box-shadow: 0 0 40px rgba(236,72,153,0.75), 0 0 60px rgba(249,168,212,0.40); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: scaleY(0.85) translateY(-12px); }
    to   { opacity: 1; transform: scaleY(1)    translateY(0);     }
  }

  .anim-heart  { animation: heartbeat  1.6s ease-in-out infinite;             }
  .anim-float  { animation: floatY     3.5s ease-in-out infinite;              }
  .anim-fadeup { animation: fadeUp     0.6s ease-out both;                     }
  .anim-glow   { animation: glow       2.4s ease-in-out infinite;              }
  .anim-fall   { animation: fall linear forwards;                              }
  .anim-slide  { animation: slideDown  0.5s cubic-bezier(.22,.68,0,1.2) both; }
`

/* ══════════════════════════════════════════════════════════════
   CONFETTI
   ══════════════════════════════════════════════════════════════ */
function ConfettiOverlay({ pieces }) {
  if (!pieces.length) return null
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 9998 }}>
      {pieces.map(p => (
        <span
          key={p.id}
          className="anim-fall"
          style={{
            position         : 'absolute',
            left             : `${p.left}%`,
            top              : 0,
            fontSize         : `${p.size}px`,
            animationDelay   : `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            userSelect       : 'none',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function makeConfetti() {
  const pool = ['🎉','🌸','💖','✨','🎀','💕','🌷','💝','🥂','🫶','🌹','🦋','🍓','🌺','💗']
  return Array.from({ length: 55 }, (_, i) => ({
    id   : i,
    emoji: pool[Math.floor(Math.random() * pool.length)],
    left : Math.random() * 100,
    delay: parseFloat((Math.random() * 0.9).toFixed(2)),
    dur  : parseFloat((1.6 + Math.random() * 1.8).toFixed(2)),
    size : 14 + Math.floor(Math.random() * 18),
  }))
}

/* ══════════════════════════════════════════════════════════════
   PAGE 1 — COVER
   ══════════════════════════════════════════════════════════════ */
function CoverSection({ onOpen }) {
  return (
    <section
      style={{
        minHeight      : '100svh',
        background     : 'linear-gradient(160deg, #fff5f9 0%, #fce7f3 45%, #fdf2e9 100%)',
        display        : 'flex',
        flexDirection  : 'column',
        alignItems     : 'center',
        justifyContent : 'center',
        padding        : '2rem 1.5rem',
        position       : 'relative',
        overflow       : 'hidden',
      }}
    >
      {/* Blur blobs */}
      <div style={{ position:'absolute', top:'-60px', left:'-60px', width:'200px', height:'200px', background:'rgba(249,168,212,0.28)', borderRadius:'50%', filter:'blur(64px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', right:'-40px', width:'250px', height:'250px', background:'rgba(253,186,116,0.2)', borderRadius:'50%', filter:'blur(72px)', pointerEvents:'none' }} />

      <div style={{ textAlign:'center', zIndex:1, maxWidth:'340px', width:'100%' }}>
        <div className="anim-float" style={{ fontSize:'3.5rem', marginBottom:'1.5rem' }}>🌸</div>

        <p
          className="serif italic"
          style={{ fontSize:'0.8rem', letterSpacing:'0.25em', color:'#9d4b6e', textTransform:'uppercase', marginBottom:'0.6rem' }}
        >
          A Love Story
        </p>

        <h1
          className="serif"
          style={{ fontSize:'2.3rem', lineHeight:1.15, color:'#be185d', fontWeight:700, marginBottom:'0.4rem', fontFamily:'Playfair Display, Georgia, serif' }}
        >
          The Chronicles of Us
        </h1>

        <p
          className="serif italic"
          style={{ fontSize:'1.45rem', color:'#db2777', marginBottom:'0.8rem' }}
        >
          Volume One
        </p>

        <div
          style={{
            display       : 'inline-block',
            background    : 'rgba(251,207,232,0.7)',
            backdropFilter: 'blur(8px)',
            border        : '1px solid rgba(236,72,153,0.25)',
            borderRadius  : '999px',
            padding       : '0.35rem 1.1rem',
            fontSize      : '0.78rem',
            letterSpacing : '0.1em',
            color         : '#9d174d',
            marginBottom  : '3rem',
            fontFamily    : 'Lato, sans-serif',
          }}
        >
          21 April – 21 May, 2026 &nbsp;·&nbsp; 30 Days
        </div>

        <div>
          <button
            onClick={onOpen}
            className="anim-heart anim-glow"
            style={{
              background              : 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
              color                   : '#fff',
              border                  : 'none',
              borderRadius            : '999px',
              padding                 : '1rem 2.5rem',
              fontSize                : '1.05rem',
              fontWeight              : 700,
              cursor                  : 'pointer',
              letterSpacing           : '0.03em',
              display                 : 'inline-flex',
              alignItems              : 'center',
              gap                     : '0.5rem',
              WebkitTapHighlightColor : 'transparent',
              fontFamily              : 'Lato, sans-serif',
            }}
          >
            <span style={{ fontSize:'1.4rem' }}>💖</span>
            Open with Love
          </button>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE 2 — MEMORY PROFILE / POLAROID
   ══════════════════════════════════════════════════════════════ */
function MemorySection({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      style={{
        minHeight     : '100svh',
        background    : 'linear-gradient(180deg, #fdf6f0 0%, #fef9f5 100%)',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        justifyContent: 'center',
        padding       : '3rem 1.5rem',
      }}
    >
      <div style={{ textAlign:'center', maxWidth:'320px', marginBottom:'1.75rem' }}>
        <span style={{ fontSize:'0.72rem', letterSpacing:'0.2em', color:'#c2410c', textTransform:'uppercase', fontFamily:'Lato, sans-serif' }}>
          Chapter One
        </span>
        <h2
          className="serif"
          style={{ fontSize:'1.55rem', color:'#9a3412', fontWeight:700, marginTop:'0.35rem', lineHeight:1.3, fontFamily:'Playfair Display, Georgia, serif' }}
        >
          Day 1: Where the chaos started... 💖
        </h2>
      </div>

      {/* Polaroid frame */}
      <div
        className="anim-float"
        style={{
          background: '#fff',
          padding   : '14px 14px 56px',
          boxShadow : '0 10px 30px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)',
          transform : 'rotate(-2.5deg)',
          maxWidth  : '270px',
          width     : '100%',
          position  : 'relative',
        }}
      >
        <div
          style={{
            width      : '100%',
            aspectRatio: '1 / 1',
            background : 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)',
            overflow   : 'hidden',
          }}
        >
          <img
            src="/first-date.jpg"
            alt="Our first date"
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
          />
        </div>
        <p
          className="serif italic"
          style={{
            position : 'absolute',
            bottom   : '14px',
            left     : 0,
            right    : 0,
            textAlign: 'center',
            color    : '#9a3412',
            fontSize : '0.85rem',
          }}
        >
          the beginning 🌷
        </p>
      </div>

      <p
        style={{ textAlign:'center', maxWidth:'295px', marginTop:'2rem', color:'#713f12', lineHeight:1.75, fontSize:'0.97rem', fontFamily:'Lato, sans-serif' }}
      >
        "The exact moment I realized I was completely in trouble —
        <span className="serif italic" style={{ color:'#c2410c' }}> the best kind.</span>"
      </p>

      <div style={{ marginTop:'2.5rem', textAlign:'center', opacity:0.45 }}>
        <p style={{ fontSize:'1.6rem', lineHeight:1 }}>↓</p>
        <p style={{ fontSize:'0.68rem', letterSpacing:'0.18em', color:'#9a3412', textTransform:'uppercase', marginTop:'0.25rem', fontFamily:'Lato, sans-serif' }}>
          Scroll to continue
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE 3 — STATS
   ══════════════════════════════════════════════════════════════ */
const STATS = [
  { emoji:'💬', label:'Texts sent',               value:'4,321+', accent:'#7c3aed' },
  { emoji:'😂', label:'Inside jokes made',         value:'42',     accent:'#db2777' },
  { emoji:'🍟', label:'Times you stole my fries',  value:'11',     accent:'#d97706' },
  { emoji:'💭', label:'Times I missed you',         value:'24/7',   accent:'#0891b2' },
]

function StatsSection() {
  return (
    <section
      style={{
        minHeight     : '100svh',
        background    : 'linear-gradient(160deg, #f5f3ff 0%, #fce7f3 55%, #fdf2f8 100%)',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        justifyContent: 'center',
        padding       : '3rem 1.25rem',
      }}
    >
      <div style={{ textAlign:'center', marginBottom:'2rem', maxWidth:'320px' }}>
        <span style={{ fontSize:'0.72rem', letterSpacing:'0.2em', color:'#7c3aed', textTransform:'uppercase', fontFamily:'Lato, sans-serif' }}>
          One Month In
        </span>
        <h2
          className="serif"
          style={{ fontSize:'1.75rem', color:'#4c1d95', fontWeight:700, marginTop:'0.35rem', fontFamily:'Playfair Display, Georgia, serif' }}
        >
          Our Stats ✨
        </h2>
        <p style={{ color:'#6d28d9', fontSize:'0.88rem', marginTop:'0.4rem', fontFamily:'Lato, sans-serif' }}>
          Empirically proven. Scientifically <span className="serif italic">us</span>.
        </p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem', width:'100%', maxWidth:'360px' }}>
        {STATS.map(s => (
          <div
            key={s.label}
            className="anim-fadeup"
            style={{
              background           : 'rgba(255,255,255,0.78)',
              backdropFilter       : 'blur(12px)',
              WebkitBackdropFilter : 'blur(12px)',
              border               : '1px solid rgba(255,255,255,0.9)',
              borderRadius         : '16px',
              padding              : '1rem 1.25rem',
              display              : 'flex',
              alignItems           : 'center',
              gap                  : '1rem',
              boxShadow            : '0 4px 16px rgba(124,58,237,0.07)',
            }}
          >
            <span style={{ fontSize:'2rem', lineHeight:1, flexShrink:0 }}>{s.emoji}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:'0.78rem', color:'#6b7280', marginBottom:'0.1rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'Lato, sans-serif' }}>
                {s.label}
              </p>
              <p style={{ fontSize:'1.55rem', fontWeight:700, color:s.accent, lineHeight:1, fontFamily:'Lato, sans-serif' }}>
                {s.value}
              </p>
            </div>
            <div style={{ width:'4px', height:'42px', background:s.accent, borderRadius:'2px', opacity:0.45, flexShrink:0 }} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE 4 — LETTER & CONFETTI REWARD
   ══════════════════════════════════════════════════════════════ */
const REWARD_ITEMS = [
  ['🌅', 'Sunset to remember',    "A golden hour picnic at a spot we both love."],
  ['🍓', 'Your favourite things', 'All your snacks, drinks & the playlist you made.'],
  ['🎬', 'Our movie night',       "Blankets, fairy lights & the one you've been wanting."],
  ['💌', 'Something handwritten', 'Because some things deserve to be real.'],
  ['📸', 'One photo for forever', 'The first of many anniversary pictures. 💕'],
]

function LetterSection() {
  const [pieces,   setPieces]   = useState([])
  const [revealed, setRevealed] = useState(false)

  const handleReward = () => {
    setPieces(makeConfetti())
    setRevealed(true)
    setTimeout(() => setPieces([]), 5200)
  }

  return (
    <section
      style={{
        minHeight     : '100svh',
        background    : 'linear-gradient(180deg, #fefce8 0%, #fdf8f2 50%, #fff5f9 100%)',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        justifyContent: 'flex-start',
        padding       : '3rem 1.25rem 7rem',
      }}
    >
      <ConfettiOverlay pieces={pieces} />

      <div style={{ textAlign:'center', marginBottom:'1.5rem', maxWidth:'320px' }}>
        <span style={{ fontSize:'0.72rem', letterSpacing:'0.2em', color:'#92400e', textTransform:'uppercase', fontFamily:'Lato, sans-serif' }}>
          A Love Letter
        </span>
        <h2
          className="serif"
          style={{ fontSize:'1.75rem', color:'#78350f', fontWeight:700, marginTop:'0.35rem', fontFamily:'Playfair Display, Georgia, serif' }}
        >
          One Month. Always. 🌹
        </h2>
      </div>

      {/* Letter card */}
      <div
        style={{
          background  : 'linear-gradient(180deg, #fdf6ee 0%, #fefaf5 100%)',
          border      : '1px solid rgba(180,120,60,0.2)',
          borderRadius: '16px',
          padding     : '1.75rem 1.5rem',
          maxWidth    : '360px',
          width       : '100%',
          boxShadow   : '0 8px 32px rgba(200,140,60,0.1), 0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ textAlign:'center', fontSize:'1.3rem', letterSpacing:'0.35em', marginBottom:'1.25rem' }}>
          🌸 · 🌿 · 🌸
        </div>

        <p className="serif italic" style={{ fontSize:'1.1rem', color:'#92400e', marginBottom:'1rem' }}>
          My Darling,
        </p>

        <div style={{ fontSize:'0.95rem', color:'#78350f', lineHeight:1.85, display:'flex', flexDirection:'column', gap:'0.9rem', fontFamily:'Lato, sans-serif' }}>
          <p>{"It's only been a month — and yet here we are, thirty days deep into something that already feels like home."}</p>
          <p>You came into my life and turned everything up to eleven. The laughter, the late-night chaos, the warmth of knowing you're just a text away.</p>
          <p>You steal my fries, flood my notifications, and somehow make every single ordinary moment feel extraordinary. I wouldn't change a second of it.</p>
          <p
            className="serif italic"
            style={{ fontSize:'1.05rem', color:'#be185d', textAlign:'center', padding:'0.5rem 0.25rem' }}
          >
            "You are my favourite distraction, my best adventure, and the exact kind of trouble I never want to get out of."
          </p>
          <p>Happy One Month, love. 💕</p>
          <p style={{ textAlign:'right', fontStyle:'italic', opacity:0.65 }}>— Yours 🌷</p>
        </div>

        <div style={{ height:'1px', background:'rgba(180,120,60,0.15)', margin:'1.25rem 0' }} />

        <p style={{ fontSize:'0.85rem', color:'#92400e', textAlign:'center', opacity:0.8, fontFamily:'Lato, sans-serif' }}>
          P.S. Tap the button below — you've <span className="serif italic">absolutely</span> earned it. 🌸
        </p>
      </div>

      {/* CTA — hides after first tap */}
      {!revealed && (
        <button
          onClick={handleReward}
          className="anim-glow"
          style={{
            background              : 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
            color                   : '#fff',
            border                  : 'none',
            borderRadius            : '999px',
            padding                 : '1rem 2rem',
            fontSize                : '1rem',
            fontWeight              : 700,
            cursor                  : 'pointer',
            letterSpacing           : '0.02em',
            display                 : 'inline-flex',
            alignItems              : 'center',
            gap                     : '0.5rem',
            WebkitTapHighlightColor : 'transparent',
            marginBottom            : '1.5rem',
            fontFamily              : 'Lato, sans-serif',
          }}
        >
          🎁 Tap for your 1-Month Reward
        </button>
      )}

      {/* Revealed anniversary plans */}
      {revealed && (
        <div
          className="anim-slide"
          style={{
            background           : 'rgba(255,255,255,0.88)',
            backdropFilter       : 'blur(16px)',
            WebkitBackdropFilter : 'blur(16px)',
            border               : '1px solid rgba(236,72,153,0.25)',
            borderRadius         : '20px',
            padding              : '1.5rem',
            maxWidth             : '360px',
            width                : '100%',
            boxShadow            : '0 8px 40px rgba(236,72,153,0.15)',
          }}
        >
          <h3
            className="serif"
            style={{ textAlign:'center', color:'#be185d', fontSize:'1.25rem', marginBottom:'1.25rem', fontWeight:700, fontFamily:'Playfair Display, Georgia, serif' }}
          >
            🎉 Your Anniversary Surprise 🎉
          </h3>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {REWARD_ITEMS.map(([icon, title, desc]) => (
              <div key={title} style={{ display:'flex', gap:'0.85rem', alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.4rem', flexShrink:0, marginTop:'2px' }}>{icon}</span>
                <div>
                  <p style={{ fontWeight:700, color:'#1f2937', lineHeight:1.3, fontSize:'0.95rem', fontFamily:'Lato, sans-serif' }}>{title}</p>
                  <p style={{ color:'#6b7280', fontSize:'0.83rem', marginTop:'0.15rem', lineHeight:1.55, fontFamily:'Lato, sans-serif' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'1.25rem', paddingTop:'1rem', borderTop:'1px solid rgba(236,72,153,0.15)' }}>
            <p className="serif italic" style={{ color:'#be185d', fontSize:'1rem' }}>
              Coming soon — just for you 💕
            </p>
          </div>
        </div>
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
      <style>{CSS}</style>
      <div className="scroll-root">
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
