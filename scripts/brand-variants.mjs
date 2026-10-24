// Builds transparent ClearMeat logo variants from the owner-supplied raster (assets-src/brand/clearmeat-logo.png),
// plus a side-by-side review sheet. The source is 172 x 100 px: outputs are never upscaled, and a vector or
// high-resolution original is still needed (see docs/APEX_BRAND_ASSET_REVIEW.md).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'assets-src/brand/clearmeat-logo.png';
const OUT = 'public/images/logos';
// Rows from here down hold the "CLEAR MEAT" lettering and "FEED THE WORLD" tagline; above is the C/M mark.
const TEXT_TOP = 66;
const IVORY = [244, 241, 233];

await mkdir(OUT, { recursive: true });
await mkdir('docs/brand', { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// Light-background variant: the supplied artwork as is (already transparent), trimmed.
const light = sharp(data, { raw: info }).trim({ threshold: 1 });
const lightBuf = await light.png().toBuffer();

// Dark-background variant: the mark stays untouched; the dark red lettering becomes ivory for contrast.
// Green "CLEAR" keeps its brand colour. Anti-aliased edges keep their alpha, so edges stay smooth.
const dark = Buffer.from(data);
for (let y = TEXT_TOP; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const [r, g, b, a] = [dark[i], dark[i + 1], dark[i + 2], dark[i + 3]];
    if (a > 0 && r > g + 40 && r > b + 20) [dark[i], dark[i + 1], dark[i + 2]] = IVORY;
  }
}
const darkBuf = await sharp(dark, { raw: info }).trim({ threshold: 1 }).png().toBuffer();

for (const [name, buf] of [
  ['clearmeat-on-light', lightBuf],
  ['clearmeat-on-dark', darkBuf],
]) {
  await sharp(buf).png({ compressionLevel: 9 }).toFile(`${OUT}/${name}.png`);
  await sharp(buf).webp({ lossless: true }).toFile(`${OUT}/${name}.webp`);
  const m = await sharp(buf).metadata();
  console.log(name, m.width, 'x', m.height);
}

// Review sheet: each variant on ivory, sage, deep teal and forest at 2x (nearest-neighbour, so pixels are honest).
const bgs = [
  ['Ivory #F4F1E9', '#F4F1E9', lightBuf],
  ['Sage #DCE7DF', '#DCE7DF', lightBuf],
  ['Deep teal #102B28', '#102B28', darkBuf],
  ['Forest #2F6255', '#2F6255', darkBuf],
  ['Old: white plate on dark', '#102B28', null],
];
const W = 360;
const H = 260;
const tiles = [];
for (const [i, [label, bg, buf]] of bgs.entries()) {
  const logo = await sharp(buf ?? lightBuf)
    .resize({ width: 340, kernel: 'nearest' })
    .toBuffer();
  const lm = await sharp(logo).metadata();
  const dark = bg === '#102B28' || bg === '#2F6255';
  const plate = buf
    ? ''
    : `<rect x="${(W - lm.width) / 2 - 14}" y="${(H - lm.height) / 2 - 24}" width="${lm.width + 28}" height="${lm.height + 28}" fill="#fff"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${bg}"/>${plate}<text x="16" y="${H - 14}" font-family="sans-serif" font-size="14" fill="${dark ? '#F4F1E9' : '#182723'}">${label}</text></svg>`;
  tiles.push({
    input: await sharp(Buffer.from(svg))
      .composite([
        {
          input: logo,
          left: Math.round((W - lm.width) / 2),
          top: Math.round((H - lm.height) / 2 - 10),
        },
      ])
      .png()
      .toBuffer(),
    left: (i % 3) * W,
    top: Math.floor(i / 3) * H,
  });
}
await sharp({ create: { width: W * 3, height: H * 2, channels: 3, background: '#e9e6de' } })
  .composite(tiles)
  .jpeg({ quality: 90 })
  .toFile('docs/brand/clearmeat-logo-previews.jpg');
console.log('docs/brand/clearmeat-logo-previews.jpg');
