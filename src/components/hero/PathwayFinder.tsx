import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { objectives, type Objective, type ObjectiveId } from '../../content/site'

type Props = {
  selected: ObjectiveId
  onSelect: (id: ObjectiveId) => void
  onEnquire: (id: ObjectiveId) => void
}

/** Find Your Pathway: pick an objective, see the matching APEX service and how engagement works. */
export function PathwayFinder({ selected, onSelect, onEnquire }: Props) {
  const current = objectives.find((o) => o.id === selected) ?? objectives[0]

  return (
    <section
      aria-labelledby="finder-title"
      className="rounded-2xl border border-cream/10 bg-raised/80 p-5 backdrop-blur-sm sm:p-6"
    >
      <p className="label text-amber">Find your pathway</p>
      <h2 id="finder-title" className="mt-2 font-display text-[1.75rem] leading-tight text-cream">
        What are you trying to do?
      </h2>

      <fieldset className="mt-4">
        <legend className="sr-only">Choose your objective</legend>
        <div className="grid">
          {objectives.map((o) => {
            const on = o.id === selected
            return (
              <label
                key={o.id}
                className={`group flex min-h-11 cursor-pointer items-center gap-3 border-t border-cream/10 py-2.5 text-sm transition-colors duration-300 first:border-t-0 ${
                  on ? 'text-cream' : 'text-cream/65 hover:text-cream'
                }`}
              >
                <input
                  type="radio"
                  name="objective"
                  value={o.id}
                  checked={on}
                  onChange={() => onSelect(o.id)}
                  className="peer sr-only"
                />
                {/* Square node, echoing the stage nodes in the diagram */}
                <span
                  aria-hidden
                  className={`size-2.5 shrink-0 border transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-amber ${
                    on ? 'border-amber bg-amber' : 'border-cream/40 group-hover:border-cream/80'
                  }`}
                />
                <span className="min-w-0 flex-1">{o.prompt}</span>
                <span className={`label shrink-0 ${on ? 'text-amber' : 'text-cream/35'}`}>{o.service}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-4 border-t border-cream/15 pt-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <Result objective={current} onEnquire={onEnquire} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Result({ objective: o, onEnquire }: { objective: Objective; onEnquire: (id: ObjectiveId) => void }) {
  return (
    <>
      <h3 className="font-display text-2xl leading-tight text-cream">{o.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/75">{o.summary}</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="label text-cream/45">How it works</dt>
          <dd className="mt-1 text-cream/85">{o.engagement}</dd>
        </div>
        <div>
          <dt className="label text-cream/45">Who it suits</dt>
          <dd className="mt-1 text-cream/85">{o.audience}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="label text-cream/45">Where it fits</dt>
          <dd className="label mt-1.5 text-amber">
            {o.stages.join(' · ')}
            <span className="ml-2 font-sans normal-case tracking-normal text-cream/45">highlighted on the journey below</span>
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-stone">{o.note}</p>
      <button
        type="button"
        onClick={() => onEnquire(o.id)}
        className="group mt-5 inline-flex min-h-11 items-center gap-3 rounded-full bg-amber px-5 text-sm font-medium text-charcoal transition-colors duration-300 hover:bg-cream"
      >
        {o.cta}
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </>
  )
}
