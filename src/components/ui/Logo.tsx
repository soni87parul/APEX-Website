const logos = {
  'apex-dark': {
    file: 'apex-logo-on-dark',
    w: 520,
    h: 217,
    alt: 'APEX, Alt Protein Excellence Hub',
  },
  'apex-light': {
    file: 'apex-logo-on-light',
    w: 520,
    h: 209,
    alt: 'APEX, Alt Protein Excellence Hub',
  },
  'niftem-white': { file: 'niftem-kundli-white', w: 400, h: 141, alt: 'NIFTEM-Kundli' },
  'niftem-green': { file: 'niftem-kundli-green', w: 400, h: 141, alt: 'NIFTEM-Kundli' },
  clearmeat: { file: 'clearmeat-logo', w: 172, h: 100, alt: 'ClearMeat' },
} as const;

export type LogoName = keyof typeof logos;

/** Official logos supplied by the owner (see docs/ASSET_CREDITS.md). */
export function Logo({
  name,
  className,
  alt,
}: {
  name: LogoName;
  className?: string;
  alt?: string;
}) {
  const l = logos[name];
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`/images/logos/${l.file}.webp`} />
      <img
        src={`/images/logos/${l.file}.png`}
        width={l.w}
        height={l.h}
        alt={alt ?? l.alt}
        decoding="async"
      />
    </picture>
  );
}
