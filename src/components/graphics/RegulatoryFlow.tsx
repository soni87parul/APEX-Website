import { regulatoryFlow } from '../../content/platform';

/**
 * Infographic C: regulatory support journey. Semantic ordered list styled as a flow; APEX's role (guidance and
 * coordination) is bracketed separately from the applicant's submission and the authority's decision.
 */
export function RegulatoryFlow({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`reg-flow${compact ? ' reg-flow--compact' : ''}`}
      aria-labelledby="reg-flow-caption"
    >
      <ol className="reg-flow__steps">
        {regulatoryFlow.map((s, i) => (
          <li
            key={s.no}
            className={`reg-flow__step${i === regulatoryFlow.length - 1 ? ' is-applicant' : ''}`}
          >
            <span className="reg-flow__node" aria-hidden="true">
              {s.no}
            </span>
            <span className="reg-flow__title">{s.title}</span>
            {!compact && <span className="reg-flow__text">{s.text}</span>}
          </li>
        ))}
      </ol>
      <div className="reg-flow__roles" aria-hidden="true">
        <span className="reg-flow__role reg-flow__role--apex">APEX guidance and coordination</span>
        <span className="reg-flow__role reg-flow__role--applicant">Applicant → authority</span>
      </div>
      <figcaption id="reg-flow-caption">
        APEX provides guidance and coordination; regulatory approvals are issued by the relevant
        authority, not APEX.
      </figcaption>
    </figure>
  );
}
