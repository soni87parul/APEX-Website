# APEX redesign: audit and creative proposal (checkpoint 1 + 2)

Branch `claude/apex-website-build-jm8pmq`, draft PR #2. Nothing is merged, deployed or connected to a live backend.

## 1. What existed before this round

| Area        | Implementation                                                                                         | Kept?                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Stack       | React 18, TypeScript strict, Vite 6, plain CSS tokens, Lucide, self-hosted fonts, sharp image pipeline | Kept. No new runtime dependencies added.                                                                                       |
| Routing     | Hand-rolled path map in `src/App.tsx`: `/`, `/work-with-apex`, 404                                     | Kept; `/events` added. `public/.htaccess` already rewrites deep links for Hostinger.                                           |
| Header      | Sticky header, native `<dialog>` mobile menu with focus return                                         | Kept; nav items changed to Platform, Pathways, Capabilities, Inside APEX, Events, Ecosystem + Work With APEX.                  |
| Enquiry     | 3-step wizard, validation, honeypot, `VITE_ENQUIRY_ENDPOINT`, no fake success                          | Kept unchanged in logic. Only its section background and heading size changed.                                                 |
| Tabs        | Accessible technology tabs (arrows, Home/End)                                                          | Kept; photos removed from tabs (no repeats), schematics moved behind a labelled disclosure, deep-linkable with `#inside-<id>`. |
| SEO         | Per-route title/description/canonical, JSON-LD, sitemap, robots                                        | Kept; Events entry added (canonical `/events/`).                                                                               |
| Tests       | Playwright + axe on desktop 1440 and mobile 390                                                        | Updated for the new structure; Events tests added. 27 pass, 5 skipped by design.                                               |
| Review mode | `?review` outlines every claim awaiting approval                                                       | Kept.                                                                                                                          |

## 2. What changed, and why (before / after)

| Spec problem               | Before                                                                                       | After                                                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Childish connector lines   | SVG curves from three pathway cards to six foundation modules, with draw animation           | Removed entirely (component, CSS, animation, `foundation` data). A test asserts no connector element remains.                                                                                                                            |
| Photo repetition           | ~5 photos reused in hero, pathways, capabilities, tabs                                       | Each ClearMeat photo used **once** on the homepage: hero (researcher at cabinet), cultivated panel (cell-culture plate), Inside APEX (team, media prep), ClearX9 callout. A test asserts no duplicates.                                  |
| Diagrams as primary art    | Large black bioreactor/extruder schematics on fermentation and plant cards                   | Panels are photo-led. Where no rights-cleared photo exists yet, the panel shows a labelled "Photo pending" slot, never a substitute picture. Schematics remain only behind "View schematic · illustrative, not APEX equipment".          |
| Repeated explanations      | Pathways + shared-foundation row + 7 capability panel + 5-stage journey panel + 4 photo tabs | Platform strip (one sentence) → 3 pathway panels → 5 capability groups (expand to all 7 services) → slim 5-step strip → Inside APEX mosaic + compact tabs.                                                                               |
| Long, monotonous page      | Dark/ivory alternation, oversized headings, many uppercase mono labels                       | Deep teal / ivory / sage / white rhythm; type scale reduced (hero max 4.4rem, h2 max 2.85rem); kickers now sentence-case sans; mono kept for small numbering only. Desktop page height ~7,700px at 1440 (from a heavier, longer layout). |
| White-boxed ClearMeat logo | Logo on a white plate on dark backgrounds                                                    | Transparent light and dark variants; plate removed in footer and ecosystem. See `APEX_BRAND_ASSET_REVIEW.md`.                                                                                                                            |
| No Events                  | Absent                                                                                       | `Events` in nav, homepage preview, and `/events/` page.                                                                                                                                                                                  |

## 3. Homepage structure (as built in the preview)

1. Hero: full-bleed authentic photo, headline "From protein innovation to industrial reality.", two CTAs, partnership line.
2. Platform strip (`#platform`): the plug-in proposition, three facts, readiness legend.
3. Pathways (`#pathways`): Cultivated proteins, Fermentation, Plant-based proteins. Whole panel clickable; opens the matching Inside APEX tab.
4. What APEX enables (`#capabilities`): 5 groups (access, contract R&D and development, pilot and scale readiness, India entry and regulatory orientation, training and collaboration); pilot and regulatory carry explicit qualifiers; ClearX9 callout; slim 5-step journey.
5. Inside APEX (`#inside`): photo mosaic, four short highlights (REQUIRES APPROVAL), compact tabs.
6. Who APEX works with (`#who`): four segments.
7. Ecosystem (`#ecosystem`): compact strip. ClearMeat runs and manages; NIFTEM-Kundli institutional partner; MoFPI as text-only context.
8. Events preview: one image, one line, link to `/events/`.
9. Work With APEX (`#work-with-apex`): unchanged wizard.

## 4. Events page (`/events/`)

Hero (one active campaign, status-driven CTA, report link once `report_available`, text fallback when none is active) → Photos and video (album filter, asymmetric mosaic, native-dialog lightbox with arrows, Escape, focus return) → Next at APEX (half-height, toggleable) → Media and insights (link cards; no third-party scripts or pasted HTML) → compact ecosystem.

All content comes from `src/content/events.ts`, whose types mirror the planned CMS tables (`hero_campaigns`, `promo_blocks`, `gallery_albums`, `gallery_items`, `media_items`). When the backend is approved, that file is replaced by an API response of the same shape. Every image on the page is a generated, visibly labelled placeholder (`scripts/placeholders.mjs`); no event, date, venue or post is invented.

Known limitation: the gallery uses dense grid packing, so on desktop a few tiles appear in a different visual order from the lightbox sequence. Acceptable for review; can be replaced by a fixed layout pattern once real photos and their aspect ratios are known.

## 5. Design tokens (`src/styles/tokens.css`)

| Token                 | Value                                                                | Use                                              |
| --------------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| `--deep`              | `#102B28`                                                            | Hero overlay, pathways, ecosystem, header        |
| `--forest`            | `#2F6255`                                                            | Accents on light surfaces, hover                 |
| `--ivory`             | `#F4F1E9`                                                            | Light sections                                   |
| `--sage-pale`         | `#DCE7DF`                                                            | Quiet sections (Inside APEX, enquiry)            |
| `--amber` (champagne) | `#C6A06C`                                                            | Primary CTA and sparse highlights only           |
| `--text`              | `#182723`                                                            | Body ink                                         |
| Type                  | Manrope (headings), DM Sans (body), JetBrains Mono (small numbering) | Already self-hosted; no new font licences needed |
| Radius                | 6px buttons, 10px panels                                             |                                                  |

## 6. Mobile behaviour

Single column under 700px; pathway panels 400px tall; capability groups stack with expanders; journey becomes a vertical rail; Inside APEX photos fixed 280px; tabs scroll horizontally; gallery switches to a 2-column dense grid; lightbox controls move to the bottom; header collapses to the dialog menu below 1100px.

## 7. QA run on this checkpoint

`npm run typecheck`, `npm run lint`, `npm run build`: pass. Playwright (desktop 1440, mobile 390): 27 passed, 5 skipped by design, including axe (no serious/critical violations) on `/` and `/events/`, lightbox keyboard flow, album filter, pathway-to-tab deep link, capability expanders, no duplicate homepage photos.

## 8. Not done in this checkpoint (waits for approval)

Admin panel and backend, Hostinger compatibility check, real photos for fermentation, plant-based, capabilities and facility slots, MoFPI logo, final copy approvals, deployment.
