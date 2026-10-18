import { ArrowRight, Briefcase, Globe2, Landmark, Rocket } from 'lucide-react';
import { audiences } from '../../content/audiences';
import { sections } from '../../content/site';
import { EnquiryLink } from '../ui/EnquiryLink';

const icons = { rocket: Rocket, briefcase: Briefcase, globe: Globe2, landmark: Landmark };

/** Section 05: four audience journeys; each CTA preselects the matching enquiry objective. */
export function Audiences({ detailed = false }: { detailed?: boolean }) {
  const s = sections.audiences;
  return (
    <section
      id="who"
      className="section section--light audiences"
      aria-labelledby="audiences-title"
    >
      <div className="wrap">
        <div className="audiences__head" data-reveal>
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id="audiences-title">{s.title}</h2>
        </div>
        <ul className="audiences__list">
          {audiences.map((a) => {
            const Icon = icons[a.icon];
            return (
              <li key={a.id} className="audience" data-reveal>
                <Icon aria-hidden="true" size={26} strokeWidth={1.5} className="audience__icon" />
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                {detailed && (
                  <ul className="audience__detail">
                    {a.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
                <EnquiryLink objective={a.objective} className="text-link audience__cta">
                  {a.cta} <ArrowRight aria-hidden="true" size={16} />
                </EnquiryLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
