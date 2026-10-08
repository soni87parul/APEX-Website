# APEX website: development plan

**Status:** approved on 8 October 2026, with these refinements:
- The hero communicates the platform positioning and commercial value at once.
- A "Find Your Pathway" selector sits in the hero.
- Wording stays strict about current capability versus scale-up and manufacturing ambitions.
- Navigation is simplified to APEX · Capabilities · Infrastructure · Ecosystem · Work With APEX · Connect.
- Hero, journey, pathways, explorer and enquiry share one visual system.
- Imagery is licensed and conceptual.
- Work goes through feature branches and pull requests.

The homepage is kept compact: Why APEX and Updates fold into neighbouring sections rather than standing alone.

Based on the repository README, the APEX creative brief and Parul's kickoff message. Nothing below changes the repository until it is approved.

## 0. What is in the repository today

`soni87parul/APEX-Website`, branch `main`:

| File | Status |
|---|---|
| `README.md` | Project overview, audiences, architecture, rules. **Kept as is.** |
| `.gitignore` | Standard Node ignore file (already covers `node_modules`, `dist`). **Kept as is.** |

No application code exists yet, so the plan adds new files only. The only change I'd suggest to an existing file is a short "Local development" section appended to the end of the README. I'll make it only if you agree.

An early hero and navigation preview was built from the brief before this message arrived ([preview](https://claude.ai/artifact/CFYd7wwRHgWcJtN2M6ojdd)). It is **not pushed**. It sits on a local branch and serves as a sketch for this plan. Once the plan is approved, I'll restyle it to the palette below.

## 1. Project structure and development setup

Stack: React 18, Vite 6, TypeScript (strict), Tailwind CSS 3, Motion for React, Lucide icons. Static-first, with no CMS, database or backend until the enquiry flow is approved.

```
index.html
netlify.toml                 Build settings and redirects for preview deploys (added at deploy step)
src/
  main.tsx, App.tsx          Entry and page composition
  content/                   All copy, nav, audiences, services, ecosystem list (edit here, not in components)
    site.ts  audiences.ts  services.ts  ecosystem.ts
  media/                     Licensed images plus credits.ts (source, licence, photographer) for every image
  styles/index.css           Design tokens as CSS variables, base styles, reduced-motion rules
  hooks/                     useActiveSection, useScrolled, useDialog (focus trap, Esc, scroll lock)
  components/
    layout/                  SiteHeader, MobileMenu, Footer
    ui/                      Button, Media (swappable image slot), SectionHeading, Wordmark
    connect/                 ConnectDrawer, TalkToApex
  sections/                  One file per homepage section
  pages/                     Home.tsx, WorkWithApex.tsx
```

- **Routing:** two routes, `/` and `/work-with-apex?audience=startups`. Audience cards deep-link with the right tab preselected.
- **Tooling:** ESLint and Prettier. `npm run dev`, `npm run build` and `npm run preview`. Node 20 or later.
- **Git:** one branch and one pull request per step in section 4. Nothing goes to `main` without your review.
- **Hosting:** Netlify preview URLs only. apex.clearmeat.org is never touched without explicit approval.

## 2. Visual design system

Direction: a modern industrial technology platform. The look takes its cues from architecture and plant engineering (plan drawings, process lines, material surfaces) rather than lab-biotech clichés. The recurring motif is three process lines plugging into one shared infrastructure band, which is APEX's own story.

**Palette (charcoal, warm amber, sage, cream)**

| Token | Hex | Role |
|---|---|---|
| charcoal | #16191B | Primary dark ground |
| charcoal-raised | #22272A | Cards, drawers and overlays on dark |
| cream | #F2ECE0 | Light sections, text on dark |
| cream-soft | #FAF6EE | Lightest surface (forms, Work With APEX panels) |
| amber | #D99A3D | Primary accent: key words, active states, focus rings |
| sage | #8FA58A | Secondary accent: supporting highlights, ecosystem, success states |
| stone | #8A8E8A | Muted text and hairlines |

Pathway colour-coding stays inside the palette: **cellular = amber, fermentation = cream, plant-based = sage**. These colours only appear where pathways are being discussed. All text pairs will meet WCAG AA contrast.

**Typography** (all Google Fonts, free; can be swapped when brand fonts are confirmed)
- Display: Instrument Serif, large editorial headlines, with italic reserved for one accent phrase.
- Body and UI: Inter Tight.
- Labels and data: JetBrains Mono in small uppercase for stage names, captions and section markers.
- Fluid type scale from 14px body up to about 104px hero.

**Imagery**
- Licensed photography (Unsplash or Pexels, or Adobe Stock if you have an account) of industrial process, materials and food texture, graded warm to sit with the palette.
- Every image goes through one `Media` component with a credits entry, so real facility photos can replace them later with no code change.
- Illustrations are labelled as illustrative. No facility shots are presented as APEX's own.

**Layout and motion**
- 12-column grid, max width about 1400px, generous whitespace.
- Hairline rules instead of boxed card grids, and dark and light sections alternating.
- One orchestrated motion moment per section: line-draw, reveal, pathway activation.
- Every animation respects reduced-motion settings, and content is fully readable without animation.

## 3. Homepage sections and interactions

| # | Section | Interaction |
|---|---|---|
| 1 | **Hero**: positioning line, two CTAs (Find your pathway, Connect with APEX), operator credit | Pathway lines draw in. Hovering a pathway highlights its line. Optional background image or video slot. |
| 2 | **What APEX is**: research → develop → validate → pilot → scale → market | Scroll-driven: each stage lights up along one connected line as you scroll. |
| 3 | **Who it serves**: four audiences with their one-line messages | Interactive cards that expand on hover or focus. Clicking opens Work With APEX on that audience. |
| 4 | **How APEX supports you**: Access, Develop, Scale, Enter India, Learn | Tabbed or accordion pathway list. Each has its own "Discuss this" button that opens the enquiry preselected. |
| 5 | **Technology pathways**: cellular, fermentation, plant-based | The three lines from the hero return, showing what each covers over shared infrastructure. |
| 6 | **Specialised inputs**: ClearX9 | A quiet single row with a link out to ClearMeat. |
| 7 | **Infrastructure explorer** | Capability-led explorer (zones such as cell culture, fermentation, food processing, analytics). Choosing a zone swaps the image and description. No inventories, capacities or square footage. |
| 8 | **Why APEX**: specialisation, integration, India-connected ecosystem | Three statements with restrained motion. |
| 9 | **APEX Ecosystem**: ClearMeat, NIFTEM, MoFPI ecosystem, then wider organisations and "And growing" | Logo wall driven by `ecosystem.ts`. Logos appear only once permission is confirmed; text names until then. |
| 10 | **Updates** | A small curated strip with LinkedIn and Instagram links. No blog and no embedded feed. |
| 11 | **What are you trying to build?** | Service-led buttons that open the enquiry drawer, plus email and WhatsApp. |

**Across the site:**
- Sticky compact navigation: APEX · How It Works · Capabilities · Infrastructure · Ecosystem · Updates · Work With APEX · Connect.
- Full-screen accessible mobile menu.
- A small "Talk to APEX" button after the hero.

**Page 2, Work With APEX:** four audience tabs, each with a proposition, relevant services, a three- or four-step engagement journey, and a CTA.

## 4. Implementation sequence

Each step ends with a preview link and your sign-off before the next one starts.

1. **Foundation**: tokens, fonts, layout primitives, navigation, mobile menu, footer.
2. **Hero**: final copy, pathway visual, image slot. Design review.
3. **Story sections**: What APEX is, Who it serves, How APEX supports you.
4. **Technology and infrastructure**: pathways, ClearX9, infrastructure explorer.
5. **Trust and close**: Why APEX, Ecosystem, Updates, final CTA.
6. **Work With APEX page**: four audience tabs, with deep links from the homepage cards.
7. **Enquiry experience**: drawer UI, then the backend (for example Netlify Forms) only after you approve the questions, destinations, privacy notice and spam protection.
8. **Quality pass**: mobile, keyboard, screen reader, reduced motion, image licences, SEO metadata, Lighthouse performance.
9. **Staging deploy** on a Netlify preview URL. Production only on your explicit approval.

## 5. Decisions needed from you

1. Approve the palette hex values above, or send brand colours.
2. The image source: free (Unsplash or Pexels) or a paid stock account.
3. Whether I may append the "Local development" section to the README.
4. How code reaches GitHub: branch plus pull request per step (recommended), or straight to main.

Still open from the brief, but not blocking yet:
- Logo files
- Verified NIFTEM / MoFPI wording
- Ecosystem logo permissions
- Contact email, WhatsApp and social links
