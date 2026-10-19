# Repository audit and build plan

Date: 13 October 2026 · Branch: `claude/apex-website-build-jm8pmq`

## What the repository held before this branch

| Item | State |
|---|---|
| `main` | Three commits: `README.md`, `.gitignore`, `APEX_Website_Project_Context.md`. No application code, no package manager, no build, no assets. |
| Hosting | None configured. README names Netlify for previews and `apex.clearmeat.org` as the intended production domain. |
| Earlier local sketch | A React/Vite/Tailwind hero stub existed only in the project's shared files (never pushed). Its hooks informed this build; no code was copied wholesale. |
| Assets | Official logos (APEX light and dark, ClearMeat, NIFTEM-Kundli green and white) and five client photos, supplied in the project files. |

Nothing existing was overwritten. `README.md` gained a "Local development" section; `.gitignore` gained build/test output entries.

## Stack decision

React 18 + TypeScript (strict) + Vite 6, matching the README's proposed stack, with two deliberate deviations:

- **No Tailwind.** The design is bespoke and editorial; tokenised plain CSS (`src/styles/tokens.css`, `global.css`) was shorter and clearer than long utility strings, and dropping the Tailwind 3 toolchain removed seven `npm audit` findings. `npm audit` is clean.
- **No Motion library.** Every animation in the spec is a CSS transition or a one-time `IntersectionObserver` trigger. This keeps the JS bundle at about 66 kB gzipped and makes reduced motion trivial.

Lucide supplies the four audience icons and UI arrows. Fonts (Manrope, DM Sans, JetBrains Mono for small labels) are self-hosted from `@fontsource`; no third-party font requests.

## Network finding

This environment cannot reach Wikimedia Commons, Unsplash or Pexels (connections fail). None of the external candidate images could be opened, so none were downloaded or used. The spec's fallback is applied: original SVG diagrams for fermentation, plant-protein processing, scale-up and regulatory flow. See `ASSET_CREDITS.md`.

## Plan as built

1. Visual system: tokens, type scale, dark/ivory/sage/amber section rhythm.
2. Seven homepage sections from Checkpoint 3, three accessible infographics, a `/work-with-apex` page.
3. Content in `src/content/*.ts`; claims register, SEO plan, copy decisions in `docs/`.
4. Enquiry UI with validation and honest submission states; backend left unconnected pending approval.
5. QA: typecheck, lint, Playwright (desktop 1440 and mobile 390), axe, Lighthouse, screenshots at six widths.
6. Hosting-neutral `DEPLOYMENT.md`.
