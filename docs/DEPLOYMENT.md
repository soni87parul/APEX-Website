# Deployment guide (hosting-neutral)

**Do not deploy to `apex.clearmeat.org`, change DNS or connect an email backend without explicit approval.** This guide prepares the build; it does not perform a deployment.

## Build

Requirements: Node 20 or later.

```bash
npm ci
npm run build        # type-checks, then writes the static site to dist/
npm run preview      # serves dist/ at http://localhost:4173 to check it
```

`dist/` is a fully static site: `index.html`, fingerprinted JS/CSS/fonts in `dist/assets/`, images in `dist/images/`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, favicons and `.htaccess`.

## Environment variables (build time)

| Variable | Purpose | Default |
|---|---|---|
| `VITE_ENQUIRY_ENDPOINT` | HTTPS URL that receives enquiry JSON by `POST`. The form shows "received" only when it answers 2xx. | Unset: the form says submissions are not connected and sends nothing. |

Never put API keys in `VITE_*` variables: they end up in public JavaScript. The endpoint must hold any secret server-side.

## SPA fallback (required)

`/work-with-apex` is a client-side route. The server must return `index.html` for unknown paths.

- **Apache / cPanel / Hostinger**: `dist/.htaccess` is included (rewrite to `index.html`, long cache for assets, no-cache for `index.html`). Upload the *contents* of `dist/` to `public_html/` (or the subdomain's document root). Make sure hidden files are uploaded.
- **Nginx**: `location / { try_files $uri $uri/ /index.html; }` and `location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }`.
- **Netlify** (optional): add `public/_redirects` with `/* /index.html 200`.
- **Vercel** (optional): `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.
- **S3 + CloudFront**: set the error document / custom error response for 403/404 to `/index.html` with status 200.

## Staging

Use a separate subdomain (for example `staging.apex.clearmeat.org`) protected with HTTP basic auth, and add `Header set X-Robots-Tag "noindex, nofollow"` so it is not indexed.

## DNS and HTTPS checklist (production, after approval)

1. Confirm who controls `clearmeat.org` DNS and the hosting account.
2. Lower the TTL on the existing `apex` record a day before switching.
3. Point `apex` to the new host (A/AAAA or CNAME as the host specifies).
4. Issue a TLS certificate (Let's Encrypt via cPanel AutoSSL, or the host's equivalent). Force HTTPS.
5. Check `https://apex.clearmeat.org/`, `/work-with-apex`, a deep link refresh, `/robots.txt`, `/sitemap.xml`.
6. Keep the previous site's files for rollback.

## Enquiry backend options (choose one, then approve)

1. **Hosted form service** (e.g. Formspree, Basin, Getform): quickest; check data-residency and privacy terms.
2. **Serverless function** (Cloudflare Workers, Vercel/Netlify Functions, AWS Lambda) that validates, discards honeypot submissions (`website` field non-empty), rate-limits by IP, and emails via a transactional provider (Postmark, SES, Resend).
3. **Existing mail/CRM** with a webhook endpoint.

Confirm the notification address, reply-from address and the privacy notice text before connecting. Payload fields: `objective, technologyArea, organisationType, description, timeline, name, email, organisation, country, consent, website (honeypot), submittedFrom`.

## Updating content or images

- Copy: `src/content/*.ts`. Rebuild.
- Images: put originals in `assets-src/`, list them in `scripts/optimize-images.mjs`, run `npm run images`, update `src/content/images.ts` and `image-manifest.json`.
