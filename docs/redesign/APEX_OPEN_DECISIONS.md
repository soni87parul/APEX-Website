# APEX open decisions

Only items that cannot be verified from the repo, the supplied files or public sources.

## Needed to approve the visual checkpoint

1. **Approve the redesign direction** (homepage and Events page as previewed) before the full implementation and the admin backend start.
2. **Dark-background ClearMeat logo**: approve the ivory-lettered variant, or supply an official reversed version.

## Assets

3. **ClearMeat logo source**: original vector or a PNG at least 1000 px wide.
4. **Higher-resolution originals** of the hero researcher photo, the media-preparation photo and the ClearX9 product image.
5. **Consent** from identifiable researchers in the hero and team photos for public use.
6. **Third-party photos**: allow `commons.wikimedia.org`, `upload.wikimedia.org`, `unsplash.com`, `images.unsplash.com`, `pexels.com` and `images.pexels.com` in the cloud environment's network settings, or send the chosen files. Picks are in `APEX_IMAGE_ASSET_REGISTER.md`, section C.
7. **Plant-protein processing photo**: no free extrusion or pilot-line photo exists; can a partner (e.g. NIFTEM-Kundli) supply one with permission?
8. **Authentic facility photo** for the Inside APEX "Facility photo pending" slot.
9. **Real event material**: featured event name, dates, venue, banner, registration link, and genuine event photos for the gallery.

## Wording and relationships

10. **APEX expanded name**: "Alt Protein Excellence Hub" (logo) or "Alternative Protein Excellence" (briefs).
11. **NIFTEM-Kundli**: exact partnership wording and written logo permission.
12. **MoFPI**: confirm text-only context is acceptable; no logo or emblem until written permission (see brand review).
13. **Capability statuses** (current research foundation / partner-supported / in development) for each pathway, capability group and journey stage, and the four Inside APEX highlights.

## Hosting and backend (gate for the admin panel)

14. **Hostinger plan** name, PHP version, MySQL/MariaDB availability, whether `apex.clearmeat.org` has its own document root, SSL status, and how deployment access will work (File Manager, FTP/SFTP or Git).
    - Proposed if PHP 8.x + MySQL are available: a small PHP API with a private `/admin/` (hashed passwords, CSRF tokens, secure cookies, login throttling, MIME and size checks, randomised file names, no executable uploads, parameterised SQL, audit log). The React site reads the same JSON shape it uses now.
    - If not available: a hosted headless CMS is the fallback, with trade-offs listed before choosing.
15. **Enquiry destination**: which inbox receives enquiries, and the privacy notice text.
