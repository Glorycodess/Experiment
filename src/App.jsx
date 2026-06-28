import { useState, useEffect } from 'react'
import Header from './components/Header'

function getInitialDark() {
  const saved = localStorage.getItem('experiment-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
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
      {/* Scroll placeholder — remove once real page sections are built */}
      <div className="min-h-[200vh] bg-[var(--bg-raised)] flex items-center justify-center text-[var(--muted)] text-sm">
        page content placeholder
      </div>
    </>
  )
}
