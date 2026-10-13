import { useState } from 'react';
import { foundation, pathways, statusLabels } from '../../content/pathways';
import { sections } from '../../content/site';
import type { PathwayId } from '../../content/types';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../layout/SectionHeading';
import { BioreactorDiagram } from '../graphics/BioreactorDiagram';
import { ExtrusionDiagram } from '../graphics/ExtrusionDiagram';
import { Photo } from '../ui/Photo';

// Connector geometry in a 1200-wide viewBox: card centres sit at 1/6, 3/6 and 5/6 of the width, the six
// foundation modules at 1/12, 3/12 ... 11/12.
const cardX = { cellular: 200, fermentation: 600, plant: 1000 } as const;
const moduleX = (i: number) => 100 + i * 200;

/** Section 02 and Infographic A: three pathways converging on six shared foundation modules. */
export function Pathways() {
  const [selected, setSelected] = useState<PathwayId>('cellular');
  const [figureRef, inView] = useInView<HTMLDivElement>();
  const current = pathways.find((p) => p.id === selected)!;
  const s = sections.pathways;

  const summary = pathways
    .map((p) => {
      const used = foundation.filter((m) => p.uses[m.id]).map((m) => m.title.toLowerCase());
      return `${p.title} draws on ${used.join(', ')}.`;
    })
    .join(' ');

  return (
    <section
      id="pathways"
      className="section section--dark pathways"
      aria-labelledby="pathways-title"
    >
      <div className="wrap">
        <SectionHeading id="pathways-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div
          ref={figureRef}
          className={`pathways__figure${inView ? ' is-drawn' : ''}`}
          data-selected={selected}
          role="group"
          aria-label="Technology pathways and the shared APEX foundation"
          aria-describedby="pathways-summary"
        >
          <p id="pathways-summary" className="sr-only">
            {summary} Select a pathway to highlight the shared modules it uses.
          </p>

          <div className="pathways__switch" role="group" aria-label="Choose a pathway">
            {pathways.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`pathways__switch-btn pw-${p.id}`}
                aria-pressed={selected === p.id}
                onClick={() => setSelected(p.id)}
              >
                <i aria-hidden="true" /> {p.title}
              </button>
            ))}
          </div>

          <div className="pathways__cards">
            {pathways.map((p) => {
              const isSelected = p.id === selected;
              return (
                <article
                  key={p.id}
                  className={`pw-card pw-${p.id}${isSelected ? ' is-selected' : ''}`}
                  data-reveal
                >
                  <div className="pw-card__media">
                    {p.visual.kind === 'photo' ? (
                      <Photo
                        id={p.visual.image}
                        alt="A 12-well cell-culture plate with pink growth medium and handwritten labels"
                        sizes="(min-width: 1024px) 420px, 100vw"
                      />
                    ) : p.visual.diagram === 'bioreactor' ? (
                      <BioreactorDiagram />
                    ) : (
                      <ExtrusionDiagram compact />
                    )}
                    <span className="photo-tag">{p.visual.caption}</span>
                  </div>
                  <div className="pw-card__body">
                    <div className="pw-card__kicker">
                      <span className="mono-label">
                        Pathway {p.no} · {p.family}
                      </span>
                      <i className="pw-dot" aria-hidden="true" />
                    </div>
                    <h3>
                      <button
                        type="button"
                        className="pw-card__select"
                        aria-pressed={isSelected}
                        onClick={() => setSelected(p.id)}
                      >
                        {p.title}
                      </button>
                    </h3>
                    <p>{p.text}</p>
                    <div className="pw-card__apps">
                      <span className="mono-label mono-label--muted">
                        Potential application areas
                      </span>
                      <p>{p.applications}</p>
                    </div>
                    <ul className="pw-card__chips" aria-label={`Shared modules used by ${p.title}`}>
                      {foundation.map((m) => (
                        <li key={m.id} className={p.uses[m.id] ? 'is-used' : undefined}>
                          {m.no} {m.short}
                          <span className="sr-only">
                            {p.uses[m.id] ? ': used' : ': not typically used'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <svg
            className="pathways__connectors"
            viewBox="0 0 1200 140"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {pathways.map((p) =>
              foundation.map((m, i) =>
                p.uses[m.id] ? (
                  <path
                    key={`${p.id}-${m.id}`}
                    className={`pw-line pw-${p.id}${p.id === selected ? ' is-active' : ''}`}
                    d={`M${cardX[p.id]} 0 C${cardX[p.id]} 70 ${moduleX(i)} 70 ${moduleX(i)} 140`}
                    pathLength={1}
                  />
                ) : null,
              ),
            )}
          </svg>

          <div id="platform" className="foundation">
            <div className="foundation__head">
              <div>
                <span className="mono-label">Shared foundation</span>
                <h3>APEX infrastructure platform</h3>
              </div>
              <p aria-live="polite">
                Highlighted: the shared modules <strong>{current.title.toLowerCase()}</strong> draws
                on. Statuses are drafts for APEX to confirm.
              </p>
            </div>
            <ol className="foundation__modules">
              {foundation.map((m) => {
                const status = current.uses[m.id];
                return (
                  <li key={m.id} className={status ? 'is-lit' : undefined}>
                    <span className="mono-label">{m.no}</span>
                    <h4>{m.title}</h4>
                    <p>{m.text}</p>
                    <span className="foundation__status" data-claim="requires-approval">
                      {status ? statusLabels[status] : 'Optional'}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
