import type { ResponsiveImage } from '../../content/events';

/** Visible label on any AI-generated concept image used in event slots. */
export function ConceptTag({ image, className }: { image: ResponsiveImage; className?: string }) {
  if (!image.concept) return null;
  return (
    <span className={`photo-tag photo-tag--illustrative${className ? ` ${className}` : ''}`}>
      <strong>Concept image · </strong>not an APEX event
    </span>
  );
}
