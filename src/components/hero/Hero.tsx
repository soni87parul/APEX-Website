import { useState } from 'react'
import { motion } from 'motion/react'
import { hero, objectives, pathways, stages, type ObjectiveId, type PathwayId } from '../../content/site'
import { Button, ButtonLink } from '../ui/Button'
import { PathwayField } from './PathwayField'
import { PathwayFinder } from './PathwayFinder'

const swatch: Record<PathwayId, string> = {
  cellular: 'bg-cellular',
  fermentation: 'bg-fermentation',
  plant: 'bg-plant',
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero({ onConnect }: { onConnect: (topic?: string) => void }) {
  const [objective, setObjective] = useState<ObjectiveId>(objectives[0].id)
  const activeStages = objectives.find((o) => o.id === objective)?.stages ?? []

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-charcoal pt-24 lg:pt-32">
      {/* Ambient light. A licensed conceptual image or video can sit here later. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 85% 10%, rgb(var(--amber) / 0.10), transparent 70%), radial-gradient(45% 55% at 0% 95%, rgb(var(--sage) / 0.08), transparent 70%)',
        }}
      />

      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7 lg:pt-4">
          <motion.p {...rise(0)} className="label flex items-center gap-3 text-cream/60">
            <span aria-hidden className="inline-block h-px w-8 bg-amber" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-title"
            {...rise(0.08)}
            className="mt-6 text-balance font-display text-[clamp(2.75rem,6.2vw,5.75rem)] leading-[0.96] tracking-[-0.015em] text-cream"
          >
            {hero.headline.lead} <em className="text-amber">{hero.headline.accent}</em>{' '}
            <span className="whitespace-nowrap">{hero.headline.tail}</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
            {hero.proposition}
          </motion.p>
          <motion.ul {...rise(0.22)} aria-label="What APEX offers" className="mt-6 flex max-w-xl flex-wrap gap-x-4 gap-y-2">
            {hero.services.map((s) => (
              <li key={s} className="label flex items-center gap-2 text-cream/55">
                <span aria-hidden className="size-1 bg-sage" />
                {s}
              </li>
            ))}
          </motion.ul>
          <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => onConnect()} arrow>
              Connect with APEX
            </Button>
            <ButtonLink href="#work-with-apex" variant="ghost">
              Work With APEX
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div {...rise(0.2)} className="min-w-0 lg:col-span-5">
          <PathwayFinder selected={objective} onSelect={setObjective} onEnquire={(id) => onConnect(id)} />
        </motion.div>
      </div>

      {/* Journey diagram, lit by the selected objective */}
      <div className="container-site mt-14 lg:mt-16">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Technology pathways">
            {pathways.map((p) => (
              <li key={p.id} className="flex items-center gap-2 text-xs text-cream/70">
                <span aria-hidden className={`h-0.5 w-5 ${swatch[p.id]}`} />
                {p.label}
              </li>
            ))}
            <li className="flex items-center gap-2 text-xs text-cream/70">
              <span aria-hidden className="h-2.5 w-5 border-y border-cream/30 bg-[repeating-linear-gradient(45deg,rgb(var(--cream)/0.12)_0_1px,transparent_1px_6px)]" />
              Shared APEX infrastructure
            </li>
          </ul>
          <p className="label text-cream/35">Illustrative concept</p>
        </div>

        <div className="aspect-[1200/260] w-full max-w-full">
          <PathwayField activeStages={activeStages} />
        </div>

        <ol className="mt-3 grid grid-cols-3 gap-y-2 sm:grid-cols-6" aria-label="Development journey">
          {stages.map((s, i) => {
            const on = (activeStages as readonly string[]).includes(s)
            return (
              <li
                key={s}
                className={`label flex gap-2 transition-colors duration-300 ${on ? 'text-amber' : 'text-cream/45'}`}
              >
                <span className={on ? 'text-amber/70' : 'text-cream/25'}>{String(i + 1).padStart(2, '0')}</span>
                {s}
                {on && <span className="sr-only">(relevant to your selection)</span>}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="container-site mt-10 border-t border-cream/10 py-5">
        <p className="max-w-xl text-xs leading-relaxed text-cream/50">{hero.operatorCredit}</p>
      </div>
    </section>
  )
}
