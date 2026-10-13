import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { journey } from '../../content/capabilities';
import { statusLabels } from '../../content/pathways';
import { sections } from '../../content/site';
import { useInView } from '../../hooks/useInView';
import { EnquiryLink } from '../ui/EnquiryLink';
import { StatusLabel } from '../ui/StatusLabel';

/** Infographic B: research → develop → validate → pilot → scale readiness, with a selected detail panel. */
export function Journey() {
  const [selected, setSelected] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>();
  const stage = journey[selected];
  const s = sections.journey;

  return (
    <div
      ref={ref}
      className={`journey${inView ? ' is-drawn' : ''}`}
      role="region"
      aria-labelledby="journey-title"
    >
      <div className="journey__head" data-reveal>
        <div>
          <p className="eyebrow">{s.eyebrow}</p>
          <h3 id="journey-title">{s.title}</h3>
        </div>
        <p>{s.intro}</p>
      </div>

      <div className="journey__body">
        <ol
          className="journey__rail"
          style={{ ['--progress' as string]: selected / (journey.length - 1) }}
        >
          {journey.map((j, i) => (
            <li key={j.id} className={i <= selected ? 'is-reached' : undefined}>
              <button
                type="button"
                aria-pressed={i === selected}
                aria-controls="journey-detail"
                onClick={() => setSelected(i)}
              >
                <span className="journey__node" aria-hidden="true">
                  {j.no}
                </span>
                <span className="journey__title">{j.title}</span>
                <span className="journey__outcome">{j.outcome}</span>
              </button>
            </li>
          ))}
        </ol>

        <div id="journey-detail" className="journey__detail" aria-live="polite">
          <span className="mono-label">
            Stage {stage.no} · {stage.title}
          </span>
          <p className="journey__detail-outcome">{stage.outcome}</p>
          <p>{stage.detail}</p>
          <div className="journey__detail-foot">
            <StatusLabel status={stage.status}>{statusLabels[stage.status]}</StatusLabel>
            <EnquiryLink objective={stage.cta.objective} className="text-link">
              {stage.cta.label} <ArrowRight aria-hidden="true" size={16} />
            </EnquiryLink>
          </div>
        </div>
      </div>
    </div>
  );
}
