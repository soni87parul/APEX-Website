import { journey } from '../../content/capabilities';
import { sections } from '../../content/site';

/** A slim five-step strip: the support journey in one line per stage. */
export function Journey() {
  const s = sections.journey;
  return (
    <div className="journey" role="region" aria-labelledby="journey-title">
      <div className="journey__head">
        <h3 id="journey-title">{s.title}</h3>
        <p>{s.intro}</p>
      </div>
      <ol className="journey__steps">
        {journey.map((j) => (
          <li key={j.id} className={`journey__step journey__step--${j.status}`}>
            <span className="journey__no">{j.no}</span>
            <strong>{j.title}</strong>
            <span>{j.outcome}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
