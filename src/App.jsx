import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'

function getInitialDark() {
  const saved = localStorage.getItem('experiment-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const MONO = { fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em' }

function PlaceholderSection({ id, label, bg, border }) {
  return (
    <section
      id={id}
      className={`min-h-screen w-full px-8 pt-24 pb-20 ${bg} ${border ?? ''}`}
    >
      <span className="block text-xs text-[var(--muted)] mb-6" style={MONO}>
        {label}
      </span>
      <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
        [{label.charAt(0) + label.slice(1).toLowerCase()} headline placeholder]
      </h2>
      <p className="text-[var(--muted)] max-w-xl leading-relaxed">
        [Placeholder body text for the {label.toLowerCase()} section — real copy coming soon]
      </p>
    </section>
  )
}

export default function App() {
  const [dark, setDark] = useState(getInitialDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('experiment-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <Header dark={dark} onToggle={() => setDark((d) => !d)} />
      <HeroSection />
      <PlaceholderSection id="hypothesis" label="HYPOTHESIS" bg="bg-[var(--bg)]"         border="border-b border-[var(--border)]" />
      <PlaceholderSection id="method"     label="METHOD"     bg="bg-[var(--bg-raised)]"  border="border-b border-[var(--border)]" />
      <PlaceholderSection id="results"    label="RESULTS"    bg="bg-[var(--bg)]"         border="border-b border-[var(--border)]" />
      <PlaceholderSection id="enroll"     label="ENROLL"     bg="bg-[var(--bg-raised)]"  />
    </>
  )
}
