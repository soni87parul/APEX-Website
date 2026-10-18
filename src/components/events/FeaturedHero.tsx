import { ArrowRight, FileText } from 'lucide-react';
import { eventsPage, heroCampaigns, statusText } from '../../content/events';
import { EventImage } from './EventImage';

/**
 * The one active hero campaign. Before an event the CTA opens registration or the programme; once a report is
 * attached the same banner points to it. With no active campaign, a text-only fallback is shown.
 */
export function FeaturedHero() {
  const c = heroCampaigns.find((h) => h.active);

  if (!c) {
    return (
      <section className="ev-hero ev-hero--fallback" aria-labelledby="events-title">
        <div className="wrap ev-hero__content">
          <h1 id="events-title">{eventsPage.noHero.headline}</h1>
          <p>{eventsPage.noHero.body}</p>
        </div>
      </section>
    );
  }

  const action = c.status === 'report_available' && c.report ? c.report : c.cta;

  return (
    <section className="ev-hero" aria-labelledby="events-title">
      <EventImage image={c.image} sizes="100vw" priority className="ev-hero__media" />
      <div className="wrap ev-hero__content">
        <p className="ev-hero__meta">
          <span className="ev-hero__status">{statusText[c.status]}</span>
          {c.eyebrow}
          {c.date && <span> · {c.date}</span>}
          {c.venue && <span> · {c.venue}</span>}
        </p>
        <h1 id="events-title">{c.headline}</h1>
        <p className="ev-hero__body">{c.body}</p>
        {action ? (
          <a href={action.url} className="btn btn--primary">
            {c.status === 'report_available' ? <FileText aria-hidden="true" size={18} /> : null}
            {action.label} <ArrowRight aria-hidden="true" size={18} />
          </a>
        ) : (
          <p className="ev-hero__pending">Registration link to be added in the admin.</p>
        )}
      </div>
    </section>
  );
}
