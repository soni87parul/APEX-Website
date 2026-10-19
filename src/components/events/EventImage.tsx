import type { ResponsiveImage } from '../../content/events';

/** Responsive WebP/JPG image for CMS-managed event content, with optional focal point per breakpoint. */
export function EventImage({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: ResponsiveImage;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const set = (ext: string) => image.widths.map((w) => `${image.src}-${w}.${ext} ${w}w`).join(', ');
  const largest = image.widths[image.widths.length - 1];
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`${image.src}-${largest}.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        style={
          image.focal
            ? ({
                ['--focal-d' as string]: image.focal.desktop,
                ['--focal-m' as string]: image.focal.mobile,
              } as React.CSSProperties)
            : undefined
        }
      />
    </picture>
  );
}
