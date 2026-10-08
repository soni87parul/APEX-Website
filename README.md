# APEX | Alternative Protein Excellence

India's specialised biomanufacturing ecosystem for alternative and novel proteins.

## About APEX

APEX is an integrated infrastructure platform supporting the research, development, validation, scale-up and manufacturing of alternative and novel proteins in India.

**Our positioning:** If you want to build, develop, scale or manufacture alternative protein in India, APEX is the infrastructure platform you plug into.

APEX is run and managed by ClearMeat in partnership with NIFTEM, under the Ministry of Food Processing Industries (MoFPI) ecosystem.

## Website Objective

Create a visually distinctive, premium and interactive website that explains the APEX platform, showcases its capabilities and converts interested organisations into qualified enquiries.

The website should feel like a connected biotechnology and industrial infrastructure ecosystem, not a conventional laboratory or corporate brochure.

## Target Audiences

- Startups seeking pay-per-seat research infrastructure
- Corporates seeking contract R&D and product development
- Global companies exploring India market entry and manufacturing pathways
- Government and research institutions seeking collaborative research and industrial support

## Website Architecture

### Page 1: Home
- Hero and APEX positioning
- Connected research-to-market ecosystem
- Four audience pathways
- How APEX supports you
- Technology platforms: cellular, fermentation and plant-based
- Specialised inputs including ClearX9
- Visual infrastructure explorer
- Why APEX
- APEX ecosystem and collaborators
- Updates and social media
- Contact call to action

### Page 2: Work With APEX
- Startup pathway
- Corporate R&D pathway
- Global company / India entry pathway
- Government and research institution pathway
- Engagement process and relevant services

### Enquiry Experience
A responsive, interactive enquiry form with audience and service selection, followed by relevant questions, contact details, and options to connect through email or WhatsApp.

## APEX Services

- Pay-per-seat research access with shared equipment and utilities
- Contract R&D
- Pilot production
- Scale-up and manufacturing support
- Regulatory and India market-entry support
- Training and capability development
- ClearX9 media samples and specialised ingredients

Commercial terms, pricing, minimum durations and equipment specifications should not be published.

## Technology Platforms

- Cultivated and cellular proteins
- Fermentation
- Plant-based proteins

## APEX Ecosystem

Institutional context: ClearMeat, NIFTEM and MoFPI.

Wider ecosystem organisations to display subject to brand permissions and accurate relationship descriptions: Bühler, ProVeg, BRINC, BITS BioCyTiH and Nestlé.

Do not label all ecosystem organisations as formal strategic partners or imply endorsements beyond verified relationships.

## Design Principles

- Premium, cinematic and editorial visual direction
- Sophisticated but restrained animations
- Connected nodes, pathways and process visualisations
- Distinctive typography and generous whitespace
- Responsive and accessible interactions
- Real facility photography when available
- Clearly identified conceptual or illustrative imagery where appropriate
- No generic biotech stock-template appearance
- No exaggerated scientific, operational or government claims

## Proposed Technology Stack

- React + Vite + TypeScript
- Tailwind CSS
- Motion for React
- Lucide icons
- Netlify hosting
- GitHub version control

## Development Workflow

1. Establish the design system and responsive navigation.
2. Build and review the homepage hero.
3. Implement interactive ecosystem and capability sections.
4. Develop Work With APEX audience journeys.
5. Implement and test enquiry, email and WhatsApp flows.
6. Optimise accessibility, SEO, performance and mobile responsiveness.
7. Deploy to a staging URL and review before production.

## Development Rules

- Build modular, reusable components.
- Keep content and ecosystem organisations easy to update.
- Use semantic HTML and accessible interactions.
- Support reduced-motion preferences.
- Never invent facility capacities, certifications, client results or manufacturing claims.
- Never expose private credentials or API keys.
- Do not replace the existing production website without explicit approval.

## Deployment

Development and preview deployment: Netlify.

Intended production domain: https://apex.clearmeat.org

Production deployment will occur only after design, content and functional approval.

## Project Status

Initial development and design implementation.

## Local development

```
npm install
npm run dev      # local dev server
npm run build    # static build in dist/
```

Requires Node 20 or later. `npm run lint` checks the code and `npm run format` tidies it.

The approved plan (structure, design system, sections, sequence) is in [docs/PLAN.md](docs/PLAN.md). All site copy lives in `src/content/site.ts`, so wording can change without touching components.
