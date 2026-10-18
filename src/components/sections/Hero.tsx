import { ArrowRight } from 'lucide-react';
import { hero } from '../../content/site';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture>
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet="/images/photos/researcher-cabinet-mobile-480.avif 480w, /images/photos/researcher-cabinet-mobile-780.avif 780w"
            sizes="100vw"
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/images/photos/researcher-cabinet-mobile-480.webp 480w, /images/photos/researcher-cabinet-mobile-780.webp 780w"
            sizes="100vw"
          />
          <source
            type="image/avif"
            srcSet="/images/photos/researcher-cabinet-960.avif 960w, /images/photos/researcher-cabinet-1280.avif 1280w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/images/photos/researcher-cabinet-960.webp 960w, /images/photos/researcher-cabinet-1280.webp 1280w"
            sizes="100vw"
          />
          <img
            src="/images/photos/researcher-cabinet-1280.jpg"
            alt="A researcher pipetting into a multi-well plate inside a biosafety cabinet at the ClearMeat laboratory"
            width={1280}
            height={960}
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
        <p className="photo-tag hero__tag">{hero.photoCaption}</p>
      </div>

      <div className="wrap hero__content">
        <p className="eyebrow hero__anim" style={{ ['--d' as string]: '0ms' }}>
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="hero__title hero__anim"
          style={{ ['--d' as string]: '80ms' }}
        >
          {hero.headlineLead} <span className="accent">{hero.headlineAccent}</span>
        </h1>
        <p className="hero__sub hero__anim" style={{ ['--d' as string]: '160ms' }}>
          {hero.sub}
        </p>
        <p className="hero__lede hero__anim" style={{ ['--d' as string]: '220ms' }}>
          {hero.lede}
        </p>
        <div className="hero__ctas hero__anim" style={{ ['--d' as string]: '280ms' }}>
          <a href={hero.primaryCta.href} className="btn btn--primary">
            {hero.primaryCta.label} <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a href={hero.secondaryCta.href} className="btn btn--ghost">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="wrap hero__foot hero__anim" style={{ ['--d' as string]: '340ms' }}>
        <p className="hero__institution" data-claim="requires-approval">
          {hero.institutional.text}
        </p>
      </div>
    </section>
  );
}
