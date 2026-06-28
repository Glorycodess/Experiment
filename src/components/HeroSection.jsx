import { useRef, useEffect, useState } from 'react'

const MONO = { fontFamily: "'IBM Plex Mono', monospace" }

// ── Lorenz attractor ──────────────────────────────────────────────────
// σ=10, ρ=28, β=8/3  — the classic parameter set that produces the
// well-known two-lobed butterfly.  RK4, dt=0.01, 8 000 steps after a
// 500-step warm-up to land on the attractor.  Projected onto x–z (the
// recognisable "two eyes" / "owl" view).

function rk4Step(x, y, z, dt) {
  const σ = 10, ρ = 28, β = 8 / 3

  const dx1 = σ*(y-x),                dy1 = x*(ρ-z)-y,            dz1 = x*y - β*z
  const x2=x+dx1*dt/2, y2=y+dy1*dt/2, z2=z+dz1*dt/2
  const dx2 = σ*(y2-x2),              dy2 = x2*(ρ-z2)-y2,         dz2 = x2*y2 - β*z2
  const x3=x+dx2*dt/2, y3=y+dy2*dt/2, z3=z+dz2*dt/2
  const dx3 = σ*(y3-x3),              dy3 = x3*(ρ-z3)-y3,         dz3 = x3*y3 - β*z3
  const x4=x+dx3*dt,   y4=y+dy3*dt,   z4=z+dz3*dt
  const dx4 = σ*(y4-x4),              dy4 = x4*(ρ-z4)-y4,         dz4 = x4*y4 - β*z4

  return [
    x + (dx1 + 2*dx2 + 2*dx3 + dx4) * dt / 6,
    y + (dy1 + 2*dy2 + 2*dy3 + dy4) * dt / 6,
    z + (dz1 + 2*dz2 + 2*dz3 + dz4) * dt / 6,
  ]
}

function buildLorenz(svgSize) {
  const dt = 0.01
  const N  = 8000

  // Step off the transient so we start on the attractor
  let x = 0.1, y = 0, z = 0
  for (let i = 0; i < 500; i++) [x, y, z] = rk4Step(x, y, z, dt)

  // Store x and z coordinates (2 floats per sample)
  const raw = new Float32Array(N * 2)
  for (let i = 0; i < N; i++) {
    raw[i*2] = x;  raw[i*2+1] = z
    ;[x, y, z] = rk4Step(x, y, z, dt)
  }

  // Actual data bounds (don't assume — measure)
  let minX = Infinity, maxX = -Infinity
  let minZ = Infinity, maxZ = -Infinity
  for (let i = 0; i < N; i++) {
    const px = raw[i*2], pz = raw[i*2+1]
    if (px < minX) minX = px;  if (px > maxX) maxX = px
    if (pz < minZ) minZ = pz;  if (pz > maxZ) maxZ = pz
  }

  const cx     = svgSize / 2
  const dataCx = (minX + maxX) / 2
  const dataCz = (minZ + maxZ) / 2
  // 0.58 leaves comfortable inset so the attractor sits inside the diamond
  const scale  = Math.min(
    (svgSize * 0.58) / (maxX - minX),
    (svgSize * 0.58) / (maxZ - minZ),
  )

  function buildD(start, end) {
    const parts = []
    for (let i = start; i < end; i++) {
      const sx = cx + (raw[i*2]   - dataCx) * scale
      const sy = cx - (raw[i*2+1] - dataCz) * scale  // flip z so high z → top of SVG
      parts.push(`${i === start ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`)
    }
    return parts.join(' ')
  }

  return {
    full:   buildD(0, N),
    // The "recent" portion draws in via stroke-dashoffset; it overlays the ghost
    recent: buildD(Math.floor(N * 0.55), N),
  }
}

// Computed once when the module loads — never re-runs on re-render
const LORENZ = buildLorenz(420)

// ─────────────────────────────────────────────────────────────────────

function LorenzDiamond({ size = 420, replayKey = 0 }) {
  const traceRef = useRef(null)

  useEffect(() => {
    const path = traceRef.current
    if (!path) return

    const len = path.getTotalLength()
    // Kill any in-progress transition so the reset is instant
    path.style.transition       = 'none'
    path.style.strokeDasharray  = `${len}`
    path.style.strokeDashoffset = `${len}`

    // One RAF commits the reset before the draw-in transition fires
    const raf = requestAnimationFrame(() => {
      path.style.transition       = 'stroke-dashoffset 5s cubic-bezier(0.4, 0, 0.15, 1)'
      path.style.strokeDashoffset = '0'
    })
    return () => cancelAnimationFrame(raf)
  }, [replayKey])

  const cx  = size / 2
  const pts = `${cx},1 ${size-1},${cx} ${cx},${size-1} 1,${cx}`

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="lorenz-clip">
          <polygon points={pts} />
        </clipPath>
      </defs>

      {/* Diamond background */}
      <polygon points={pts} style={{ fill: 'var(--bg)' }} />

      {/* No filter, no blur, no glow — plain stroked paths only */}
      <g clipPath="url(#lorenz-clip)">
        {/* Ghost: full 8 000-point trace at very low opacity.
            Shows the complete butterfly silhouette immediately. */}
        <path
          d={LORENZ.full}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.18"
          strokeLinejoin="round"
        />
        {/* Live trace: last 45 % of the path, draws in over 5 s on load.
            Higher opacity so it reads as the "current" position of the orbit. */}
        <path
          ref={traceRef}
          d={LORENZ.recent}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeOpacity="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Border last — drawn on top so no stroke escapes the diamond edge */}
      <polygon
        points={pts}
        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }}
      />
    </svg>
  )
}

// ── Hero section (layout unchanged) ──────────────────────────────────

export default function HeroSection() {
  const [replayKey, setReplayKey]     = useState(0)
  const [badgePressed, setBadgePressed] = useState(false)

  return (
    <section
      className="w-full flex items-center px-6 sm:px-10 py-20 text-[var(--fg)]"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

        {/* ── Left: headline ─────────────────────────────────── */}
        <div className="flex-1 text-center lg:text-left">
          <h1
            className="font-bold text-[var(--fg)] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
          >
            You are an&nbsp;Experiment.
          </h1>
        </div>

        {/* ── Center: diamond + tagline pill ─────────────────── */}
        <div
          className="flex-shrink-0 relative mx-auto"
          style={{ width: 'min(420px, 88vw)' }}
        >
          <LorenzDiamond size={420} replayKey={replayKey} />

          {/* Tagline pill — centred on the bottom diamond tip */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg)] pl-1 pr-4 py-1 whitespace-nowrap"
            style={{ bottom: '-14px' }}
          >
            {/*
              Logo badge — solid circle, E icon inside.
              bg: var(--fg) → black in light, near-white in dark.
              E fill: var(--bg) → white in light, near-black in dark.
              Inverts automatically with theme; no extra JS needed.

              E path (20×20 viewBox):
                Spine: x 1–5.  Three bars, height 4 each, spaced by gap 3.
                Top bar:    y  1– 5, right edge x 16 (semicircle cap, r=2)
                Middle bar: y  8–12, right edge x 13 (shorter; semicircle cap)
                Bottom bar: y 15–19, right edge x 16 (semicircle cap)
                Bar ends:   A 2 2 arc = diameter-height semicircle (fully rounded tips)
                Inner joins: Q bezier concave corners (r≈1) where bars meet gaps
                Outer corners: Q bezier (r=1.5) at top-left and bottom-left
            */}
            <div
              className="rounded-full flex-shrink-0 flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                background: 'var(--fg)',
                cursor: 'pointer',
                transform: badgePressed ? 'scale(0.82)' : 'scale(1)',
                transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onClick={() => setReplayKey(k => k + 1)}
              onPointerDown={() => setBadgePressed(true)}
              onPointerUp={() => setBadgePressed(false)}
              onPointerLeave={() => setBadgePressed(false)}
            >
              <svg
                viewBox="0 0 20 20"
                style={{ width: 14, height: 14, display: 'block' }}
                aria-hidden="true"
              >
                <path
                  fill="var(--bg)"
                  d="M2.5 1 L16 1 A2 2 0 0 1 16 5 L6 5 Q5 5 5 6 L5 7 Q5 8 6 8 L13 8 A2 2 0 0 1 13 12 L6 12 Q5 12 5 13 L5 14 Q5 15 6 15 L16 15 A2 2 0 0 1 16 19 L2.5 19 Q1 19 1 17.5 L1 2.5 Q1 1 2.5 1 Z"
                />
              </svg>
            </div>

            <span className="text-[var(--muted)]" style={{ ...MONO, fontSize: 11, letterSpacing: '0.05em' }}>
              Every chart hides a pattern.
            </span>
          </div>
        </div>

        {/* ── Right: description + CTAs ──────────────────────── */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          <p className="text-[var(--muted)] leading-relaxed text-base">
            Quant finance borrows its core ideas from physics — chaos, probability,
            systems that look random but aren't. Experiment teaches you to think the
            same way: building, testing, and trusting a process, not a feeling.
          </p>

          {/* Side-by-side on sm+; stacks on xs only */}
          <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start">
            <button
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold tracking-wide rounded-sm bg-[var(--fg)] text-[var(--bg)]"
              style={{ transition: 'opacity 180ms ease' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Join Waitlist
            </button>

            <a
              href="#method"
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold tracking-wide text-center rounded-sm border border-[var(--fg)] text-[var(--fg)] no-underline bg-[var(--bg-raised)]"
              style={{ transition: 'background-color 180ms ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--border)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-raised)'}
            >
              See Curriculum
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
