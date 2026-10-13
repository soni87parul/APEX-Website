import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { platformTabs } from '../../content/platform';
import { sections } from '../../content/site';
import { SectionHeading } from '../layout/SectionHeading';
import { BioreactorDiagram } from '../graphics/BioreactorDiagram';
import { ExtrusionDiagram } from '../graphics/ExtrusionDiagram';
import { RegulatoryFlow } from '../graphics/RegulatoryFlow';
import { EnquiryLink } from '../ui/EnquiryLink';
import { Photo } from '../ui/Photo';
import { StatusLabel, StatusLegend } from '../ui/StatusLabel';

/** Section 04: accessible tabs (arrow keys, Home/End) for the four technology areas. */
export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = sections.inside;

  const focusTab = (i: number) => {
    const next = (i + platformTabs.length) % platformTabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: platformTabs.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      focusTab(keys[e.key]);
    }
  };

  return (
    <section
      id="inside"
      className="section section--charcoal inside"
      aria-labelledby="inside-title"
    >
      <div className="wrap">
        <SectionHeading id="inside-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div className="tabs" role="tablist" aria-label="Technology areas">
          {platformTabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className="tabs__tab"
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="mono-label">{t.no}</span> {t.tab}
            </button>
          ))}
        </div>

        <StatusLegend note={s.statusNote} />

        {platformTabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="inside__panel"
          >
            <div className={`inside__media inside__media--${t.media.kind}`}>
              {t.media.kind === 'photos' ? (
                t.media.images.map((img, n) => (
                  <figure key={img.image} className={`inside__photo inside__photo--${n}`}>
                    <Photo
                      id={img.image}
                      alt={img.alt}
                      sizes={
                        n === 0
                          ? '(min-width: 1024px) 420px, 100vw'
                          : '(min-width: 1024px) 300px, 50vw'
                      }
                    />
                    <figcaption className="photo-tag">{img.caption}</figcaption>
                  </figure>
                ))
              ) : (
                <div className="inside__diagram">
                  {t.media.diagram === 'bioreactor' && <BioreactorDiagram />}
                  {t.media.diagram === 'extrusion' && <ExtrusionDiagram />}
                  {t.media.diagram === 'regulatory' && <RegulatoryFlow />}
                  {t.note && t.media.diagram !== 'regulatory' && (
                    <p className="inside__note">{t.note}</p>
                  )}
                </div>
              )}
            </div>

            <div className="inside__content">
              <span className="mono-label">{t.area}</span>
              <h3>{t.title}</h3>
              <p className="inside__text">{t.text}</p>
              <dl className="inside__facts">
                {t.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="inside__statuses">
                {t.statuses.map((st) => (
                  <StatusLabel key={st.label} status={st.status}>
                    {st.label}
                  </StatusLabel>
                ))}
              </div>
              <EnquiryLink objective={t.cta.objective} className="btn btn--primary">
                {t.cta.label} <ArrowRight aria-hidden="true" size={18} />
              </EnquiryLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
