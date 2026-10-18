import { SITE_URL } from '../content/site';
import { seo } from '../content/seo';

/** Updates title, description and canonical for client-side routes. index.html carries the homepage defaults. */
export function applySeo(path: string) {
  const page = seo.pages[path] ?? seo.pages['/'];
  const url = `${SITE_URL}${page.canonical ?? path}`;
  document.title = page.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute('content', page.description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
}
