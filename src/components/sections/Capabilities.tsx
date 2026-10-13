import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { capabilities, clearx9 } from '../../content/capabilities';
import { sections } from '../../content/site';
import { SectionHeading } from '../layout/SectionHeading';
import { RegulatoryFlow } from '../graphics/RegulatoryFlow';
import { ScaleDiagram } from '../graphics/ScaleDiagram';
import { EnquiryLink } from '../ui/EnquiryLink';
import { Photo } from '../ui/Photo';
import { Journey } from './Journey';

/** Section 03: seven capability modules with a manually selected, crossfading image panel. */
export function Capabilities() {
  const [selected, setSelected] = useState(capabilities[1].id);
  const index = capabilities.findIndex((c) => c.id === selected);
  const current = capabilities[index];
  const s = sections.capabilities;

  return (
    <section
      id="capabilities"
      className="section section--ivory capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="wrap">
        <SectionHeading
          id="capabilities-title"
          eyebrow={s.eyebrow}
          title={s.title}
          intro={s.intro}
        />

        <div className="capabilities__grid">
          <div className="capabilities__visual">
            <div className="cap-panel" id="capability-visual" aria-live="polite">
              {capabilities.map((c, i) => {
                // Only images for the selected module and its neighbours are mounted, so the crossfade has
                // its image ready without loading all seven up front.
                const near = Math.abs(i - index) <= 1;
                const active = c.id === selected;
                return (
                  <div
                    key={c.id}
                    className={`cap-panel__layer${active ? ' is-active' : ''}`}
                    aria-hidden={!active}
                  >
                    {'image' in c.visual
                      ? near && (
                          <Photo
                            id={c.visual.image}
                            alt={c.visual.alt}
                            position={c.visual.position}
                            sizes="(min-width: 1024px) 540px, 100vw"
                          />
                        )
                      : near && (
                          <div className="cap-panel__diagram">
                            {c.visual.diagram === 'scale' ? (
                              <ScaleDiagram />
                            ) : (
                              <RegulatoryFlow compact />
                            )}
                          </div>
                        )}
                  </div>
                );
              })}
              <div className="cap-panel__caption">
                <span className="mono-label">
                  Module {current.no} · {current.title}
                </span>
                <p>{current.visual.caption}</p>
                <div className="cap-panel__progress" aria-hidden="true">
                  {capabilities.map((c) => (
                    <i key={c.id} className={c.id === selected ? 'is-on' : undefined} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="clearx9" aria-labelledby="clearx9-title">
              <Photo
                id="clearx9-media"
                alt="Three ClearX9 cell growth medium bottles with two dishes of cultured cells"
                sizes="200px"
                className="clearx9__img"
              />
              <div data-claim="requires-approval">
                <span className="mono-label">Specialised input</span>
                <h3 id="clearx9-title">{clearx9.title}</h3>
                <p>{clearx9.text}</p>
                <EnquiryLink objective="rnd" className="text-link">
                  {clearx9.cta} <ArrowRight aria-hidden="true" size={16} />
                </EnquiryLink>
              </div>
            </aside>
          </div>

          <ul className="cap-list" aria-label="Capability modules">
            {capabilities.map((c) => {
              const isSelected = c.id === selected;
              return (
                <li key={c.id} className={`cap-item${isSelected ? ' is-selected' : ''}`}>
                  <button
                    type="button"
                    className="cap-item__btn"
                    aria-pressed={isSelected}
                    aria-controls="capability-visual"
                    onClick={() => setSelected(c.id)}
                  >
                    <span className="cap-item__no mono-label">
                      Module {c.no}
                      {isSelected && <span className="cap-item__sel"> · Selected</span>}
                    </span>
                    <span className="cap-item__title">{c.title}</span>
                    <span className="cap-item__text">{c.text}</span>
                    <span className="cap-item__who mono-label">{c.who}</span>
                  </button>
                </li>
              );
            })}
            <li className="cap-item cap-item--cta">
              <span className="mono-label">Combine modules</span>
              <p>Build the engagement your programme needs.</p>
              <EnquiryLink objective={current.objective} className="text-link text-link--dark">
                Work With APEX <ArrowRight aria-hidden="true" size={16} />
              </EnquiryLink>
            </li>
          </ul>
        </div>

        <Journey />
      </div>
    </section>
  );
}
