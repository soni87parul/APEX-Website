import { useState } from 'react'
import { ConnectDrawer } from './components/connect/ConnectDrawer'
import { TalkToApex } from './components/connect/TalkToApex'
import { Hero } from './components/hero/Hero'
import { Footer } from './components/layout/Footer'
import { SiteHeader } from './components/layout/SiteHeader'
import { homeSections } from './content/site'
import { SectionStub } from './sections/SectionStub'

export default function App() {
  const [connect, setConnect] = useState<{ open: boolean; topic: string | null }>({ open: false, topic: null })
  const openConnect = (topic?: string) => setConnect({ open: true, topic: topic ?? null })

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-cream px-4 py-2 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader onConnect={() => openConnect()} />
      <main id="main">
        <Hero onConnect={openConnect} />
        {homeSections.map((s) => (
          <SectionStub key={s.id} {...s} />
        ))}
        <SectionStub
          id="work-with-apex"
          n="P2"
          title="Work With APEX"
          intent="Second page: four audience tabs (Startups, Corporate R&D, Global companies / India entry, Government and research institutions), each with a proposition, relevant services, an engagement journey and a CTA."
          tone="light"
        />
      </main>
      <Footer />
      <TalkToApex onOpen={() => openConnect()} />
      <ConnectDrawer open={connect.open} topic={connect.topic} onClose={() => setConnect((c) => ({ ...c, open: false }))} />
    </>
  )
}
