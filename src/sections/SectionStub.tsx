// Wireframe placeholder for homepage sections that come after hero + navigation.
type Props = { id: string; n: string; title: string; intent: string; tone: 'light' | 'dark' }

export function SectionStub({ id, n, title, intent, tone }: Props) {
  const light = tone === 'light'
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={light ? 'bg-cream text-charcoal' : 'bg-charcoal text-cream'}
    >
      <div className={`container-site grid gap-6 border-t py-20 md:grid-cols-12 md:py-28 ${light ? 'border-charcoal/10' : 'border-cream/10'}`}>
        <p className={`label md:col-span-2 ${light ? 'text-charcoal/50' : 'text-cream/50'}`}>{n} · Next</p>
        <div className="md:col-span-8">
          <h2 id={`${id}-title`} className="font-display text-4xl leading-tight md:text-6xl">{title}</h2>
          <p className={`mt-5 max-w-2xl text-base leading-relaxed ${light ? 'text-charcoal/65' : 'text-cream/65'}`}>{intent}</p>
        </div>
      </div>
    </section>
  )
}
