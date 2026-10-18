import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { capabilities, capabilityGroups, clearx9 } from '../../content/capabilities';
import { statusLabels } from '../../content/pathways';
import { sections } from '../../content/site';
import { SectionHeading } from '../layout/SectionHeading';
import { EnquiryLink } from '../ui/EnquiryLink';
import { Photo } from '../ui/Photo';
import { StatusLabel } from '../ui/StatusLabel';
import { Journey } from './Journey';

/** Section 03: the seven services in five groups. Each group expands to the full service detail. */
export function Capabilities() {
  const [open, setOpen] = useState<string | null>(null);
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

        <ul className="cap-groups">
          {capabilityGroups.map((g) => {
            const isOpen = open === g.id;
            const detailId = `cap-detail-${g.id}`;
            return (
              <li key={g.id} className={`cap-group${isOpen ? ' is-open' : ''}`} data-reveal>
                <span className="cap-group__no">{g.no}</span>
                <h3>{g.title}</h3>
                <p className="cap-group__summary">{g.summary}</p>
                {g.qualifier && <p className="cap-group__qualifier">{g.qualifier}</p>}
                <StatusLabel status={g.status}>{statusLabels[g.status]}</StatusLabel>
                <button
                  type="button"
                  className="cap-group__toggle"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() => setOpen(isOpen ? null : g.id)}
                >
                  <Plus aria-hidden="true" size={16} />{' '}
                  {isOpen ? 'Hide detail' : 'What is included'}
                </button>
                <div id={detailId} className="cap-group__detail" hidden={!isOpen}>
                  {g.includes.map((id) => {
                    const c = capabilities.find((x) => x.id === id)!;
                    return (
                      <div key={c.id}>
                        <h4>{c.title}</h4>
                        <p>{c.text}</p>
                        <p className="cap-group__who">For: {c.who}</p>
                      </div>
                    );
                  })}
                  <EnquiryLink objective={g.objective} className="text-link text-link--dark">
                    {g.cta} <ArrowRight aria-hidden="true" size={16} />
                  </EnquiryLink>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cap-callout" data-reveal>
          <div className="cap-callout__media">
            <Photo
              id="clearx9-media"
              alt="Three bottles of ClearX9 cell growth media: Stem, Neuro and standard"
              sizes="(min-width: 768px) 320px, 100vw"
            />
          </div>
          <div>
            <span className="cap-callout__label">Specialised input</span>
            <h3 data-claim="requires-approval">{clearx9.title}</h3>
            <p data-claim="requires-approval">{clearx9.text}</p>
          </div>
          <EnquiryLink objective="rnd" className="btn btn--dark btn--sm">
            {clearx9.cta} <ArrowRight aria-hidden="true" size={16} />
          </EnquiryLink>
        </div>

        <Journey />
      </div>
    </section>
  );
}
