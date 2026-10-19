import { ArrowRight } from 'lucide-react';
import { sections } from '../../content/site';
import { promo } from '../../content/events';
import { EventImage } from '../events/EventImage';

/** Section 07: one editorial image, one line and a link to /events/. */
export function EventsPreview() {
  const s = sections.eventsPreview;
  return (
    <section className="events-preview" aria-labelledby="events-preview-title">
      <div className="wrap events-preview__inner">
        <div className="events-preview__media" data-reveal>
          <EventImage
            image={{
              ...promo.image,
              src: '/images/placeholders/events-preview',
              width: 1400,
              height: 1000,
              widths: [700, 1400],
            }}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="events-preview__text" data-reveal>
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id="events-preview-title">{s.title}</h2>
          <p>{s.text}</p>
          <a href="/events/" className="btn btn--primary">
            {s.cta} <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
