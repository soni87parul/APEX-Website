import { ExternalLink } from 'lucide-react';
import { ecosystem, sections } from '../../content/site';
import { SectionHeading } from '../layout/SectionHeading';
import { Logo } from '../ui/Logo';

/** Section 07: institutional roles, labelled exactly. MoFPI appears as text only (no emblem). */
export function Ecosystem() {
  const s = sections.ecosystem;
  return (
    <section
      id="ecosystem"
      className="section section--dark ecosystem"
      aria-labelledby="ecosystem-title"
    >
      <div className="wrap">
        <SectionHeading id="ecosystem-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <figure className="roles" aria-labelledby="roles-caption">
          <figcaption id="roles-caption" className="sr-only">
            How APEX is organised: ClearMeat runs and manages APEX in partnership with
            NIFTEM-Kundli, an institution under the Ministry of Food Processing Industries.
          </figcaption>
          <ul className="roles__list">
            {ecosystem.map((e) => (
              <li key={e.id} className={`role role--${e.id}`} data-claim={e.approval} data-reveal>
                <div className="role__logo">
                  {e.logo === 'clearmeat' && (
                    <span className="role__plate">
                      <Logo name="clearmeat" />
                    </span>
                  )}
                  {e.logo === 'niftem' && <Logo name="niftem-white" />}
                  {e.logo === null && (
                    <span className="role__wordmark">Ministry of Food Processing Industries</span>
                  )}
                </div>
                <span className="mono-label">{e.role}</span>
                <h3>{e.name}</h3>
                <p>{e.text}</p>
                <a
                  href={e.href}
                  className="text-link text-link--quiet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {e.name === 'MoFPI ecosystem' ? 'MoFPI' : e.name}
                  <ExternalLink aria-hidden="true" size={14} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </figure>
        <p className="ecosystem__note mono-label mono-label--muted">{s.collaboratorsNote}</p>
      </div>
    </section>
  );
}
