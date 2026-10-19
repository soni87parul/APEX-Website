import { ecosystem, sections } from '../../content/site';
import { Logo } from '../ui/Logo';

/**
 * Compact ecosystem strip: ClearMeat runs APEX, NIFTEM-Kundli is the institutional partner, MoFPI is context only
 * and appears as text (no government emblem until permission is confirmed).
 */
export function Ecosystem({ compact = false }: { compact?: boolean }) {
  const s = sections.ecosystem;
  return (
    <section
      id={compact ? undefined : 'ecosystem'}
      className={`ecosystem${compact ? ' ecosystem--compact' : ''}`}
      aria-labelledby={compact ? 'ecosystem-title-events' : 'ecosystem-title'}
    >
      <div className="wrap ecosystem__inner">
        <div className="ecosystem__head">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id={compact ? 'ecosystem-title-events' : 'ecosystem-title'}>{s.title}</h2>
        </div>
        <ul className="ecosystem__list">
          {ecosystem.map((e) => (
            <li key={e.id} className={`eco eco--${e.id}`} data-claim={e.approval}>
              <div className="eco__logo">
                {e.logo === 'clearmeat' && <Logo name="clearmeat-dark" />}
                {e.logo === 'niftem' && <Logo name="niftem-white" />}
                {e.logo === null && (
                  <span className="eco__wordmark">Ministry of Food Processing Industries</span>
                )}
              </div>
              <div>
                <span className="eco__role">{e.role}</span>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ul>
        {!compact && <p className="ecosystem__note">{s.collaboratorsNote}</p>}
      </div>
    </section>
  );
}
