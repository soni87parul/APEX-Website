# QA checklist and results

Run on 13 October 2026 against the production build (`npm run build` + `vite preview`), Chromium 141 (Playwright).

## Automated

| Check | Command | Result |
|---|---|---|
| Type check (strict) | `npm run typecheck` | Pass |
| Lint | `npm run lint` | Pass, 0 warnings |
| Build | `npm run build` | Pass. JS 217 kB (66 kB gzip), CSS 41 kB (9 kB gzip) |
| Dependency audit | `npm audit` | 0 vulnerabilities |
| Browser tests, desktop 1440 and mobile 390 | `CHROMIUM_PATH=… npm run test:e2e` | 21 passed; 5 skipped by design (the 4 endpoint tests below need their own build; the mobile-menu test does not apply at 1440) |
| Enquiry endpoint tests (success only on 2xx, error on 500) | build with `VITE_ENQUIRY_ENDPOINT=https://example.invalid/enquiry`, then `ENQUIRY_ENDPOINT_BUILD=1 npx playwright test tests/enquiry-endpoint.spec.ts` | 4 passed |
| axe-core, WCAG 2.2 A/AA, homepage | in `tests/site.spec.ts` | 0 serious or critical violations |
| Lighthouse, mobile preset (simulated slow 4G) | `lighthouse http://localhost:4181/` | Performance 91, Accessibility 100, Best practices 100, SEO 100. LCP 2.7 s, CLS 0, TBT 240 ms |
| Lighthouse, desktop preset | `--preset=desktop` | 100 / 100 / 100 / 100. LCP 0.6 s, CLS 0 |

Lighthouse is a lab measurement on a local server, not field data. Mobile LCP is just above the 2.5 s goal under throttling; pre-rendering the homepage (see SEO_PLAN) is the most effective fix.

## What the browser tests cover

- Hero, all seven sections, no console errors; every image has alt text and none is broken.
- Pathway selection changes the highlighted foundation modules (desktop cards, mobile switcher).
- Tabs: arrow keys and End move focus and selection; only one panel visible.
- Capability selection updates the image panel and `aria-pressed`.
- Enquiry: required-field errors, focus moves to the first invalid field and to each new step heading, Back keeps answers, CTA preselects objective, no success message without a confirmed endpoint.
- Mobile menu: opens as a modal dialog, closes on Escape, focus returns to the menu button.
- Reduced motion: no hidden content, no animation class.
- `/work-with-apex` route: own H1 and title.

## Manual checks done

- Screenshots at 375, 390, 768, 1024, 1440 and 1920 px (`docs/screenshots/`); no horizontal scroll, no overlapping text.
- Keyboard: skip link, visible focus ring on every control, tab order follows the page.
- Tap targets ≥ 44 px for buttons, options, tabs, menu items and text links.
- Nothing depends on hover.

## Not yet checked (needs a real device or the owner)

- iOS Safari and Android Chrome on hardware; Firefox; Safari `:has()` support is fine from 15.4, older Safari shows the pathway focus ring on the button instead of the card.
- Screen reader pass with VoiceOver and NVDA.
- Field Core Web Vitals (needs a live URL).
- Contrast of the hero caption tag at every crop (measured fine at the tested widths).
