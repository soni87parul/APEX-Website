// Generates responsive, optimised images in public/images from the originals in assets-src.
// Run with `npm run images` whenever an original changes. Outputs are committed.
// ClearMeat variants come from scripts/brand-variants.mjs (npm run brand).
import sharp from 'sharp';
import { access, mkdir } from 'node:fs/promises';
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
  // APEX Visual Asset Repository, round 1: AI-generated conceptual images (illustrative only, never presented
  // as APEX facilities, events or people). Full-size originals go in assets-src/apex/ with their pack folder
  // names. Until they are supplied, `preview` points at the ~324 px tile cut from the pack's contact sheet
  // (scripts/contact-sheet-crops.mjs), which is processed at its own width only and never enlarged.
  ...[
    [
      'fermentation-bioreactor-concept',
      '02_generated_conceptual_hero',
      'fermentation_bioreactor_wide',
    ],
    [
      'plant-protein-processing-concept',
      '02_generated_conceptual_hero',
      'plant_protein_processing_wide',
    ],
    ['conference-stage-concept', '02_generated_conceptual_hero', 'conference_audience_wide'],
    ['conference-audience-concept', '03_generated_editorial_thumbnails', 'conference_audience'],
    ['panel-discussion-concept', '03_generated_editorial_thumbnails', 'panel_discussion'],
    ['laboratory-interior-concept', '03_generated_editorial_thumbnails', 'laboratory_interior'],
    ['process-development-concept', '03_generated_editorial_thumbnails', 'process_development'],
    ['pilot-operations-concept', '03_generated_editorial_thumbnails', 'pilot_operations'],
    ['corporate-meeting-concept', '03_generated_editorial_thumbnails', 'corporate_meeting'],
    ['scientist-microscope-concept', '03_generated_editorial_thumbnails', 'scientist_microscope'],
  ].map(([id, folder, name]) => ({
    id,
    src: `apex/${folder}/${name}.jpg`,
    widths: folder.startsWith('02') ? [640, 1024, 1600] : [480, 800],
    preview: { src: `apex/contact-sheet/${name}.jpg`, widths: [324] },
    out: 'apex',
  })),
];

const logos = [
  { id: 'apex-logo-on-dark', src: 'brand/apex-logo-on-dark.png', width: 520 },
  { id: 'apex-logo-on-light', src: 'brand/apex-logo-on-light.png', width: 520 },
  { id: 'niftem-kundli-white', src: 'brand/niftem-kundli-white.png', width: 400 },
  { id: 'niftem-kundli-green', src: 'brand/niftem-kundli-green.png', width: 400 },
];

await mkdir(path.join(OUT, 'photos'), { recursive: true });
await mkdir(path.join(OUT, 'apex'), { recursive: true });
await mkdir(path.join(OUT, 'logos'), { recursive: true });

const exists = (f) =>
  access(f).then(
    () => true,
    () => false,
  );

for (const entry of photos) {
  let p = entry;
  if (!(await exists(path.join(SRC, p.src))) && p.preview) {
    if (await exists(path.join(SRC, p.preview.src))) {
      console.warn('using contact-sheet stand-in for', p.id);
      p = { ...p, ...p.preview };
    }
  }
  if (!(await exists(path.join(SRC, p.src)))) {
    console.warn('skip (source not supplied yet):', p.src);
    continue;
  }
  const { width: srcWidth } = await sharp(path.join(SRC, p.src)).metadata();
  for (const w of p.widths.filter((x, i) => i === 0 || x <= (p.extract?.width ?? srcWidth))) {
    const base = () => {
      let img = sharp(path.join(SRC, p.src)).rotate();
      if (p.extract) img = img.extract(p.extract);
      return img.resize({ width: w, withoutEnlargement: true });
    };
    const stem = path.join(OUT, p.out ?? 'photos', `${p.id}-${w}`);
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
