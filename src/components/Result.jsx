export default function Result() {
  return (
    <section className="border-t border-[var(--border)] px-6 sm:px-10 lg:px-16 py-20 lg:py-28 max-w-5xl mx-auto w-full">

      <div className="flex flex-col lg:flex-row lg:gap-24 gap-10">
        <div className="flex-shrink-0 lg:w-40">
          <span className="font-mono text-xs text-[var(--muted)] tracking-[0.2em] uppercase">
            004 — Result
          </span>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[var(--fg)] leading-snug">
            {/* TODO: result headline */}
            [Result headline here]
          </h2>

          {/* TODO: result body — outcomes, data points, or evidence */}
          <p className="font-sans text-base text-[var(--muted)] leading-relaxed max-w-xl">
            [Result content here]
          </p>

          {/* Placeholder for a result metric or stat block — optional */}
          <div className="flex flex-wrap gap-8 pt-2">
            {['[Metric A]', '[Metric B]', '[Metric C]'].map((label) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-sans text-3xl font-semibold text-[var(--fg)] tracking-[-0.03em]">
                  —
                </span>
                <span className="font-mono text-xs text-[var(--muted)] tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
