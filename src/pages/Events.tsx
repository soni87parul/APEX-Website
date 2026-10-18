import { FeaturedHero } from '../components/events/FeaturedHero';
import { Gallery } from '../components/events/Gallery';
import { NextAtApex } from '../components/events/NextAtApex';
import { MediaInsights } from '../components/events/MediaInsights';
import { Ecosystem } from '../components/sections/Ecosystem';

/** /events/: one public page. Hero, gallery (largest), next-at-APEX strip, media, compact ecosystem. */
export function Events() {
  return (
    <>
      <FeaturedHero />
      <Gallery />
      <NextAtApex />
      <MediaInsights />
      <Ecosystem compact />
    </>
  );
}
