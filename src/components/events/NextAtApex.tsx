import { ArrowRight } from 'lucide-react';
import { promo } from '../../content/events';
import { EventImage } from './EventImage';

/** Subtle half-height promo strip, edited separately from the featured event; hidden when switched off. */
export function NextAtApex() {
  if (!promo.visible) return null;
  return (
    <section className="ev-next" aria-labelledby="next-title">
      <div className="wrap ev-next__inner">
        <EventImage
          image={promo.image}
          sizes="(min-width: 768px) 320px, 100vw"
          className="ev-next__media"
        />
        <div className="ev-next__text">
          <p className="eyebrow">{promo.eyebrow}</p>
          <h2 id="next-title">{promo.headline}</h2>
          <p>{promo.text}</p>
        </div>
        {promo.cta && (
          <a href={promo.cta.url} className="btn btn--ghost btn--sm">
            {promo.cta.label} <ArrowRight aria-hidden="true" size={16} />
          </a>
        )}
      </div>
    </section>
  );
}
