export default function Enroll() {
  return (
    <section className="border-t border-[var(--border)] px-6 sm:px-10 lg:px-16 py-24 lg:py-36 max-w-5xl mx-auto w-full">

      <div className="flex flex-col gap-10 items-start sm:items-center sm:text-center">

        <span className="font-mono text-xs text-[var(--muted)] tracking-[0.2em] uppercase">
          005 — Enroll
        </span>

        <h2 className="font-sans text-[clamp(2rem,5vw,3.75rem)] font-semibold tracking-[-0.03em] leading-[1.08] text-[var(--fg)] max-w-2xl">
          {/* TODO: enroll section headline */}
          [Enroll headline here]
        </h2>

        {/* TODO: short supporting line (optional) */}
        {/* <p className="font-sans text-base text-[var(--muted)] max-w-md leading-relaxed">
          [Supporting copy placeholder]
        </p> */}

        {/* CTA — wire up enrollment link when ready */}
        <button className="font-mono text-sm tracking-[0.12em] uppercase px-9 py-4 border border-[var(--fg)] text-[var(--fg)] bg-transparent hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-150 mt-2">
          Enroll now
        </button>

      </div>

    </section>
  )
}
