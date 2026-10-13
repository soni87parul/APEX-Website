# SEO plan (first draft)

Status: draft for review. Keyword themes below come from the brief and from how the audience is likely to search; they have **not** been validated with search-volume tools from this environment. Validate in Google Search Console and Keyword Planner after launch.

## Pages and intent

| URL | Intent | Primary theme | Secondary themes |
|---|---|---|---|
| `/` | Understand what APEX is and whether it fits; navigational for "APEX ClearMeat" | alternative protein infrastructure India | cultivated meat research infrastructure; fermentation process development India; plant protein product development; biomanufacturing platform India |
| `/work-with-apex` | Start an engagement | contract R&D alternative proteins India | pilot-scale food innovation; alternative protein R&D India; India market entry novel foods |

## Metadata (implemented)

| Page | Title (≤ 60 chars) | Description (≤ 160 chars) |
|---|---|---|
| `/` | APEX \| Alternative protein infrastructure platform in India | APEX connects research infrastructure, contract R&D, process development and pilot support for alternative proteins in India. Run by ClearMeat with NIFTEM-Kundli. |
| `/work-with-apex` | Work With APEX \| Alternative protein R&D and infrastructure in India | Tell APEX what you want to build: research infrastructure access, contract R&D, pilot development, India market entry or a research partnership. |

Defaults live in `index.html`; client-side routes update title, description, canonical and Open Graph via `src/lib/seo.ts` and `src/content/seo.ts`.

## Heading structure (homepage)

- H1: From protein innovation to industrial reality.
- H2: Three routes to new protein. One shared foundation. → H3 per pathway, H3 APEX infrastructure platform, H4 per module
- H2: Capabilities as modules you combine. → H3 ClearX9, H3 From first experiment towards manufacturing readiness
- H2: Explore what APEX supports. → H3 per tab
- H2: Four ways teams work with APEX. → H3 per audience
- H2: Build your alternative-protein programme in India. → H3 per enquiry step
- H2: Built on institutional partnership. → H3 per organisation

## Technical

- Canonical: `https://apex.clearmeat.org/` (and `/work-with-apex`). Change if the production domain differs.
- `public/robots.txt` allows all and points to `public/sitemap.xml`. **Block staging** at the server (password or `X-Robots-Tag: noindex`) so previews are not indexed.
- Open Graph and Twitter card with `public/og-image.jpg` (1200×630, generated from the hero).
- Structured data in `index.html`: `Organization` (name, alternate name, URL, logo, description, areaServed IN) and `WebSite`. Deliberately no `parentOrganization`, address, `sameAs` or ratings until confirmed. Add `sameAs` with the LinkedIn page URL once provided.
- Images: descriptive alt text on every photo; diagrams use SVG `<title>`/`<desc>`. Responsive AVIF/WebP with explicit dimensions (CLS 0 in Lighthouse).
- Language: `en-IN`.
- Single-page app: content renders client-side. Google renders JS, but for maximum robustness consider pre-rendering `/` and `/work-with-apex` to static HTML before launch (e.g. `vite-plugin-ssr`/`vite-ssg`, or a Playwright snapshot step). Listed as a follow-up.

## Internal links

Hero → `#capabilities`, `#work-with-apex`; every capability, journey stage, tab and audience links to the enquiry with its objective preselected; footer links to `/work-with-apex`.

## Next steps

1. Approve titles/descriptions and the APEX expansion.
2. Provide the LinkedIn URL for `sameAs` and a footer link.
3. Verify the domain in Search Console; submit the sitemap.
4. Decide on pre-rendering.
5. Consider future pages that match distinct intent (one per pathway, a regulatory-guidance explainer) only once content is approved.
