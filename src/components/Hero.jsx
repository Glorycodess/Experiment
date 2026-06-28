import DataViz from './DataViz'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-10 py-24">

        <span className="font-mono text-xs text-[var(--muted)] tracking-[0.2em] uppercase select-none">
          001
        </span>

        <h1 className="font-sans text-[clamp(2.75rem,8vw,6rem)] font-semibold tracking-[-0.03em] leading-[1.04] text-[var(--fg)] max-w-3xl">
          This is an experiment.
        </h1>

        {/* TODO: subtext — one short declarative line, TBD */}
        {/* <p className="font-sans text-lg text-[var(--muted)] max-w-lg leading-relaxed">
          [Subtext placeholder]
        </p> */}

        {/* CTA — wire up enrollment link when ready */}
        <div>
          <button className="font-mono text-sm tracking-[0.12em] uppercase px-7 py-3.5 border border-[var(--fg)] text-[var(--fg)] bg-transparent hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-150">
            Enroll now
          </button>
        </div>

        <DataViz />

      </div>
    </section>
  )
}
