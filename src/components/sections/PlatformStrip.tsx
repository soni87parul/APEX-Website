import { platform } from '../../content/site';
import { StatusLegend } from '../ui/StatusLabel';

/** Anchor #platform: the one-sentence proposition and the readiness legend used across the page. */
export function PlatformStrip() {
  return (
    <section id="platform" className="platform-strip" aria-labelledby="platform-title">
      <div className="wrap platform-strip__inner">
        <div data-reveal>
          <p className="eyebrow">{platform.eyebrow}</p>
          <h2 id="platform-title" className="platform-strip__statement">
            {platform.statement}
          </h2>
        </div>
        <div className="platform-strip__side" data-reveal>
          <dl className="platform-strip__points">
            {platform.points.map((p) => (
              <div key={p.label}>
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>
          <StatusLegend note="How we label capability. Drafts until APEX confirms each one." />
        </div>
      </div>
    </section>
  );
}
