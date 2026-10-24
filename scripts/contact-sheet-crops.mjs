// Cuts the 20 tiles out of the APEX Visual Asset Repository contact sheet (assets-src/apex/APEX_ASSET_CONTACT_SHEET.jpg)
// into assets-src/apex/contact-sheet/. Each tile is only about 324 x 180 px: these are preview stand-ins until the
// full-size files from the asset pack are supplied, and are never enlarged beyond that in the pipeline.
// All 20 images are AI-generated concepts (see assets-src/apex/README.md); none shows a real APEX facility or event.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SHEET = 'assets-src/apex/APEX_ASSET_CONTACT_SHEET.jpg';
const OUT = 'assets-src/apex/contact-sheet';
// Measured tile boxes (pixel columns and rows of the image area, labels excluded).
const cols = [10, 362, 711, 1060];
const rows = [8, 243, 478, 713, 948];
const names = [
  [
    'fermentation_bioreactor_wide',
    'plant_protein_processing_wide',
    'cell_culture_detail_wide',
    'conference_audience_wide',
  ],
  ['scientist_microscope', 'stainless_bioreactor', 'plant_extrusion_closeup', 'lab_culture_detail'],
  ['laboratory_interior', 'process_development', 'testing_analytics', 'pilot_operations'],
  ['research_team', 'corporate_meeting', 'event_networking', 'event_speaker'],
  ['conference_audience', 'panel_discussion', 'networking_closeup', 'group_photo'],
];
// 2 px inset on every side drops the tile edge and any anti-aliased border.
const W = 324;
const H = 180;

await mkdir(OUT, { recursive: true });
for (const [r, row] of names.entries()) {
  for (const [c, name] of row.entries()) {
    await sharp(SHEET)
      .extract({ left: cols[c] + 2, top: rows[r] + 2, width: W, height: H })
      .jpeg({ quality: 95 })
      .toFile(`${OUT}/${name}.jpg`);
  }
}
console.log('cut', names.flat().length, 'tiles to', OUT);
