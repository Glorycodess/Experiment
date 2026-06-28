export default function Hypothesis() {
  return (
    <section className="border-t border-[var(--border)] px-6 sm:px-10 lg:px-16 py-20 lg:py-28 max-w-5xl mx-auto w-full">

      <div className="flex flex-col lg:flex-row lg:gap-24 gap-10">
        <div className="flex-shrink-0 lg:w-40">
          <span className="font-mono text-xs text-[var(--muted)] tracking-[0.2em] uppercase">
            002 — Hypothesis
          </span>
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[var(--fg)] leading-snug">
            {/* TODO: hypothesis headline */}
            [Hypothesis headline here]
          </h2>
          <p className="font-sans text-base text-[var(--muted)] leading-relaxed max-w-xl">
            {/* TODO: hypothesis body copy */}
            [Hypothesis content here]
          </p>
        </div>
      </div>

    </section>
  )
}
