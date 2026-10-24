import { fallbackSrc, images, srcSet } from '../../content/images';

type Props = {
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  position?: string;
};

/** Responsive <picture> with AVIF and WebP, explicit dimensions and lazy loading below the fold. */
export function Photo({ id, alt, sizes, className, priority = false, position }: Props) {
  const set = images[id];
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(id, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(id, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(id)}
        srcSet={srcSet(id, set.fallback)}
        sizes={sizes}
        alt={alt}
        width={set.width}
        height={set.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
