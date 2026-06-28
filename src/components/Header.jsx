export default function Header({ dark, onToggle }) {
  const TRACK_W = 44
  const TRACK_H = 22
  const DOT = 15
  const PAD = 3
  const dotLeft = PAD
  const dotRight = TRACK_W - DOT - PAD   // 26
  const tickLeft = PAD + DOT / 2         // 10.5 — center of left dot position
  const tickRight = dotRight + DOT / 2   // 33.5 — center of right dot position

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[var(--border)]">

      {/* Wordmark — weight contrast: bold E + regular xperiment */}
      <div className="text-xl text-[var(--fg)] tracking-tight select-none leading-none">
        <span className="font-bold">E</span><span className="font-normal">xperiment</span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">

        {/* TODO: "Enroll now" CTA button — not built yet */}

        {/* Caption + data-point toggle */}
        <div className="flex items-center gap-3">

          {/* Toggle */}
          <button
            onClick={onToggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={dark}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
            style={{
              position: 'relative',
              width: TRACK_W,
              height: TRACK_H,
              borderRadius: TRACK_H / 2,
              flexShrink: 0,
              cursor: 'pointer',
              padding: 0,
              backgroundColor: dark ? '#262626' : '#E5E5E5',
              border: `1px solid ${dark ? '#404040' : '#D4D4D4'}`,
              transition: 'background-color 300ms ease, border-color 300ms ease',
            }}
          >
            {/* Left tick — marks the light/pending position */}
            <div style={{
              position: 'absolute',
              left: tickLeft,
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              width: 1,
              height: 7,
              borderRadius: 1,
              pointerEvents: 'none',
              backgroundColor: dark ? '#404040' : '#C0C0C0',
              transition: 'background-color 300ms ease',
            }} />
            {/* Right tick — marks the dark/confirmed position */}
            <div style={{
              position: 'absolute',
              left: tickRight,
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              width: 1,
              height: 7,
              borderRadius: 1,
              pointerEvents: 'none',
              backgroundColor: dark ? '#404040' : '#C0C0C0',
              transition: 'background-color 300ms ease',
            }} />
            {/* Sliding dot */}
            <div style={{
              position: 'absolute',
              width: DOT,
              height: DOT,
              borderRadius: '50%',
              top: '50%',
              pointerEvents: 'none',
              transform: `translateY(-50%) translateX(${dark ? dotRight : dotLeft}px)`,
              backgroundColor: dark ? '#FFFFFF' : 'transparent',
              border: `1.5px solid ${dark ? '#FFFFFF' : '#0A0A0A'}`,
              boxShadow: dark ? '0 0 10px 3px rgba(255,255,255,0.18)' : 'none',
              transition: [
                'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                'background-color 300ms ease',
                'border-color 300ms ease',
                'box-shadow 300ms ease',
              ].join(', '),
            }} />
          </button>

        </div>
      </div>
    </header>
  )
}
