# Asset credits and rights register

Last checked: 13 October 2026. Machine-readable version: `src/content/image-manifest.json`. Contact sheet: `docs/image-contact-sheet.jpg`.

**Summary: every image on the site is either client-supplied or an original SVG diagram drawn for this site. No stock, Creative Commons or AI-generated image is used.** No external photograph is presented as APEX equipment.

## Client-supplied photographs (owner: ClearMeat)

| ID | Original file | Used in | Rights and release notes | Status |
|---|---|---|---|---|
| researcher-cabinet (C02) | IMG-20250921-WA0035.jpg | Hero (desktop), capability 01, inside/cellular | Identifiable researcher. **Written publication consent needed.** Caption says "ClearMeat research laboratory"; confirm before calling it an APEX facility. | Pending |
| researcher-cabinet-mobile | same, cropped 900×900 | Hero below 768 px | As above | Pending |
| research-team (C01) | IMG-20250921-WA0021.jpg | Capabilities 02 and 07 | Several identifiable researchers. **Consent needed for each.** | Pending |
| cell-culture-plate (C03) | IMG-20230220-WA0027.jpg | Pathway 01, capability 03, inside/cellular | No people. Handwritten well labels visible; confirm nothing confidential. | Pending |
| media-preparation (C04) | IMG-20240812-WA0008.jpg | Capability 04, inside/cellular | Source is a branded social graphic; cropped inside its circular frame so the logo and pattern are excluded. **Request the unframed original.** | Pending |
| clearx9-media (C05) | img-1.png | ClearX9 inset | 584×276, used small and never upscaled. Label text reads "A Patented Product of ClearMeat"; **confirm** before publishing. **Request a high-resolution master.** | Pending |

Modifications for all photos: resize, AVIF/WebP/JPEG encoding (`scripts/optimize-images.mjs`); crops as listed. Originals are kept unmodified in `assets-src/photos/`.

## Logos

| Logo | Source file | Notes | Status |
|---|---|---|---|
| APEX (dark backgrounds) | apex-logo-dark-transparent.png | Official. Trimmed padding. | Approved by owner as official |
| APEX (light backgrounds) | Apex logo Bright.png | Official. Used in structured data. | Approved by owner as official |
| ClearMeat | ClearMeat_Logo_Final_06122022-1.png | Only 172×100 available; shown on an ivory plate. **Request vector/high-res.** | Pending master |
| NIFTEM-Kundli (white, green) | niftem logo dark.png / niftem logo.png | **Permission from NIFTEM-Kundli required before publishing.** | Pending |
| MoFPI | none | Shown as text only. No emblem is used. | n/a |

## Original diagrams (inline SVG, `src/components/graphics/`)

Bioreactor schematic, plant-protein texturisation process, bench-to-manufacturing scale diagram, regulatory support flow, pathway connector lines. Created for this site; each is labelled "Diagram" and carries a note that it does not depict APEX equipment.

## External candidates: not used

The environment could not open any of these pages on 13 October 2026, so no licence was verified and nothing was downloaded. Licences below are what the brief previously recorded, **not** a fresh check.

| Slot | Candidate | Previously recorded licence | Result today |
|---|---|---|---|
| Benchtop fermentation | commons.wikimedia.org/wiki/File:LabBioreactor.jpg | CC0 | Not reachable; not used |
| Fermentation pathway | commons.wikimedia.org/wiki/File:Bioreactors.jpg | CC BY-SA 4.0 | Not reachable; not used |
| Bioreactor detail | commons.wikimedia.org/wiki/File:Bioreactor.jpg | CC BY-SA 4.0 | Not reachable; not used |
| Cell-culture reactor | commons.wikimedia.org/wiki/File:Bioreactor_for_cell_culture_in_the_laboratory.jpg | CC BY-SA 4.0 | Not reachable; not used |
| Production bioreactor | commons.wikimedia.org/wiki/File:Production_bioreactor.jpg | CC BY-SA 4.0 | Not reachable; too small for a card anyway |
| TVP product | commons.wikimedia.org/wiki/File:Textured_vegetable_protein.jpg | Public domain | Not reachable; low resolution |
| Industrial tanks | unsplash.com/photos/…-AdchdCGeVyY | Unsplash licence | Not reachable; brewery context risk |
| Laboratory scientist | pexels.com/photo/…-8442541 | Pexels licence | Not reachable; generic stock |
| Plant-protein extrusion | none found | — | Open slot; SVG diagram in place |

### How to add one later

1. Open the original file page (not a search result), record author, licence, licence URL, date, and screenshot the page into `docs/rights-evidence/`.
2. Score it with the spec rubric; reject if scientific correctness or rights certainty is below 4.
3. Put the original in `assets-src/photos/`, add an entry to `scripts/optimize-images.mjs`, `src/content/images.ts` and `image-manifest.json` (with `isIllustrative: true`), run `npm run images`.
4. For CC BY / BY-SA, show a credit near the image or on a credits page, and record modifications. Ask for legal review if ShareAlike obligations are unclear.
