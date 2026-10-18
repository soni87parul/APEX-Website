import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ImageOff } from 'lucide-react';
import { insideHighlights, insidePhotos, platformTabs } from '../../content/platform';
import { sections } from '../../content/site';
import { SectionHeading } from '../layout/SectionHeading';
import { BioreactorDiagram } from '../graphics/BioreactorDiagram';
import { ExtrusionDiagram } from '../graphics/ExtrusionDiagram';
import { RegulatoryFlow } from '../graphics/RegulatoryFlow';
import { EnquiryLink } from '../ui/EnquiryLink';
import { Photo } from '../ui/Photo';
import { StatusLabel } from '../ui/StatusLabel';

/**
 * Section 04, Inside APEX: an authentic photo mosaic, short verified highlights, then compact technology tabs
 * (arrow keys, Home/End). Pathway panels link here with #inside-<tab id>.
 */
export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const s = sections.inside;

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#inside-(\w+)$/);
      if (!m) return;
      const i = platformTabs.findIndex((t) => t.id === m[1]);
      if (i < 0) return;
      setActive(i);
      sectionRef.current?.querySelector('.tabs')?.scrollIntoView({ block: 'start' });
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

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
      ref={sectionRef}
      id="inside"
      className="section section--sage inside"
      aria-labelledby="inside-title"
    >
      <div className="wrap">
        <SectionHeading id="inside-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div className="inside__mosaic">
          {insidePhotos.map((p, n) => (
            <figure key={p.image} className={`inside__photo inside__photo--${n}`} data-reveal>
              <Photo
                id={p.image}
                alt={p.alt}
                sizes={
                  n === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'
                }
                position={p.position}
              />
              <figcaption className="photo-tag">{p.caption}</figcaption>
            </figure>
          ))}
          <div className="inside__photo inside__photo--pending" data-reveal>
            <ImageOff aria-hidden="true" size={22} strokeWidth={1.5} />
            <span>Facility photo pending</span>
            <small>Authentic APEX or NIFTEM-Kundli facility image, with permission</small>
          </div>
          <ul className="inside__highlights" data-claim="requires-approval" data-reveal>
            {insideHighlights.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <span>{h.text}</span>
              </li>
            ))}
          </ul>
        </div>

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
              {t.tab}
            </button>
          ))}
        </div>

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
            <div className="inside__content">
              <h3>{t.title}</h3>
              <p className="inside__text">{t.text}</p>
              <div className="inside__statuses">
                {t.statuses.map((st) => (
                  <StatusLabel key={st.label} status={st.status}>
                    {st.label}
                  </StatusLabel>
                ))}
              </div>
              <EnquiryLink objective={t.cta.objective} className="text-link text-link--dark">
                {t.cta.label} <ArrowRight aria-hidden="true" size={16} />
              </EnquiryLink>
            </div>
            <dl className="inside__facts">
              {t.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            {t.diagram && (
              <details className="inside__schematic">
                <summary>
                  {t.diagram === 'regulatory' ? 'How regulatory support works' : 'View schematic'}
                  <span> · illustrative, not APEX equipment</span>
                </summary>
                <div className="inside__diagram">
                  {t.diagram === 'bioreactor' && <BioreactorDiagram />}
                  {t.diagram === 'extrusion' && <ExtrusionDiagram />}
                  {t.diagram === 'regulatory' && <RegulatoryFlow />}
                  {t.note && <p className="inside__note">{t.note}</p>}
                </div>
              </details>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
