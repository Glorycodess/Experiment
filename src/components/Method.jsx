const items = [
  {
    num: '01',
    /* TODO: method item title */
    title: '[Method step title]',
    /* TODO: method item description */
    body: '[Method step description placeholder]',
  },
  {
    num: '02',
    title: '[Method step title]',
    body: '[Method step description placeholder]',
  },
  {
    num: '03',
    title: '[Method step title]',
    body: '[Method step description placeholder]',
  },
]

export default function Method() {
  return (
    <section className="border-t border-[var(--border)] px-6 sm:px-10 lg:px-16 py-20 lg:py-28 max-w-5xl mx-auto w-full">

      <div className="flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <span className="font-mono text-xs text-[var(--muted)] tracking-[0.2em] uppercase">
            003 — Method
          </span>
          {/* TODO: optional method section sub-label or count */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)]">
          {items.map(({ num, title, body }) => (
            <div key={num} className="bg-[var(--bg)] flex flex-col gap-5 pt-8 pr-8 pb-10">
              <span className="font-mono text-xs text-[var(--muted)] tracking-[0.15em]">
                {num}
              </span>
              <h3 className="font-sans text-lg font-semibold text-[var(--fg)] leading-snug tracking-[-0.01em]">
                {title}
              </h3>
              <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
