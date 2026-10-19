// Generates clearly labelled placeholder images for the Events preview (banner, gallery, promo).
// They are layout stand-ins only and must be replaced with genuine APEX event photos before launch.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images/placeholders';
await mkdir(OUT, { recursive: true });

const palettes = [
  ['#102B28', '#2F6255'],
  ['#2F6255', '#8FB3A2'],
  ['#182723', '#C6A06C'],
  ['#DCE7DF', '#2F6255'],
  ['#C6A06C', '#102B28'],
  ['#1d3a35', '#DCE7DF'],
];

const items = [
  { id: 'event-banner', w: 1920, h: 900, p: 0, label: 'Featured event banner' },
  { id: 'promo', w: 1200, h: 800, p: 2, label: 'Next at APEX image' },
  { id: 'events-preview', w: 1400, h: 1000, p: 1, label: 'Event photo' },
  ...Array.from({ length: 12 }, (_, i) => {
    const shapes = [
      [1600, 1067],
      [1067, 1600],
      [1600, 900],
      [1200, 1200],
    ];
    const [w, h] = shapes[i % shapes.length];
    return {
      id: `gallery-${String(i + 1).padStart(2, '0')}`,
      w,
      h,
      p: i % palettes.length,
      label: `Gallery photo ${i + 1}`,
    };
  }),
];

for (const it of items) {
  const [a, b] = palettes[it.p];
  const light = a === '#DCE7DF' || a === '#C6A06C';
  const ink = light ? '#102B28' : '#F4F1E9';
  const s = Math.min(it.w, it.h);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${it.w}" height="${it.h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
  <pattern id="d" width="${s / 12}" height="${s / 12}" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="${ink}" fill-opacity="0.18"/></pattern></defs>
  <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#d)"/>
  <rect x="${s * 0.05}" y="${s * 0.05}" width="${it.w - s * 0.1}" height="${it.h - s * 0.1}" fill="none" stroke="${ink}" stroke-opacity="0.35" stroke-width="${s / 300}" stroke-dasharray="${s / 60} ${s / 80}"/>
  <text x="50%" y="48%" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="${s / 16}" fill="${ink}" letter-spacing="${s / 200}">PLACEHOLDER</text>
  <text x="50%" y="${48 + 9}%" text-anchor="middle" font-family="sans-serif" font-size="${s / 32}" fill="${ink}" fill-opacity="0.85">${it.label} · replace before launch</text>
</svg>`;
  for (const w of [Math.round(it.w / 2), it.w]) {
    const img = () => sharp(Buffer.from(svg)).resize({ width: w });
    await img().webp({ quality: 70 }).toFile(`${OUT}/${it.id}-${w}.webp`);
    await img().jpeg({ quality: 72, mozjpeg: true }).toFile(`${OUT}/${it.id}-${w}.jpg`);
  }
  console.log(it.id, it.w, it.h);
}
