// Generates responsive, optimised images in public/images from the originals in assets-src.
// Run with `npm run images` whenever an original changes. Outputs are committed.
// ClearMeat variants come from scripts/brand-variants.mjs (npm run brand).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/images';

// extract: crop in source pixels before resizing. widths: output widths (never above the crop width).
const photos = [
  {
    id: 'researcher-cabinet',
    src: 'photos/02-researcher-biosafety-cabinet_IMG-20250921-WA0035.jpg',
    widths: [640, 960, 1280],
  },
  // Tighter crop for the mobile hero: keeps the researcher's hands, pipette and plate in frame.
  {
    id: 'researcher-cabinet-mobile',
    src: 'photos/02-researcher-biosafety-cabinet_IMG-20250921-WA0035.jpg',
    extract: { left: 300, top: 0, width: 900, height: 900 },
    widths: [480, 780],
  },
  {
    id: 'research-team',
    src: 'photos/01-researchers-team-lab_IMG-20250921-WA0021.jpg',
    widths: [720, 1080, 1600],
  },
  {
    id: 'cell-culture-plate',
    src: 'photos/03-cell-culture-plate_IMG-20230220-WA0027.jpg',
    widths: [480, 800, 1200],
  },
  // Rectangle inside the circular frame of the branded social graphic; logo and frame excluded.
  {
    id: 'media-preparation',
    src: 'photos/04-clearmeat-media-prep_IMG-20240812-WA0008.jpg',
    extract: { left: 262, top: 292, width: 576, height: 704 },
    widths: [400, 576],
  },
  {
    id: 'clearx9-media',
    src: 'photos/05-clearx9-bottles_img-1.png',
    widths: [584],
    keepAlpha: true,
  },
];

const logos = [
  { id: 'apex-logo-on-dark', src: 'brand/apex-logo-on-dark.png', width: 520 },
  { id: 'apex-logo-on-light', src: 'brand/apex-logo-on-light.png', width: 520 },
  { id: 'niftem-kundli-white', src: 'brand/niftem-kundli-white.png', width: 400 },
  { id: 'niftem-kundli-green', src: 'brand/niftem-kundli-green.png', width: 400 },
];

await mkdir(path.join(OUT, 'photos'), { recursive: true });
await mkdir(path.join(OUT, 'logos'), { recursive: true });

for (const p of photos) {
  for (const w of p.widths) {
    const base = () => {
      let img = sharp(path.join(SRC, p.src)).rotate();
      if (p.extract) img = img.extract(p.extract);
      return img.resize({ width: w, withoutEnlargement: true });
    };
    const stem = path.join(OUT, 'photos', `${p.id}-${w}`);
    await base().avif({ quality: 52, effort: 6 }).toFile(`${stem}.avif`);
    await base().webp({ quality: 74 }).toFile(`${stem}.webp`);
    if (p.keepAlpha) await base().png({ compressionLevel: 9, palette: true }).toFile(`${stem}.png`);
    else await base().jpeg({ quality: 76, mozjpeg: true }).toFile(`${stem}.jpg`);
  }
  console.log('photo', p.id);
}

for (const l of logos) {
  // Trim the transparent/black padding around each logo so it aligns with the layout grid.
  const trimmed = await sharp(path.join(SRC, l.src))
    .ensureAlpha()
    .trim({ threshold: 10 })
    .toBuffer();
  const stem = path.join(OUT, 'logos', l.id);
  await sharp(trimmed)
    .resize({ width: l.width, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(`${stem}.png`);
  await sharp(trimmed)
    .resize({ width: l.width, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(`${stem}.webp`);
  const meta = await sharp(`${stem}.png`).metadata();
  console.log('logo', l.id, meta.width, meta.height);
}
