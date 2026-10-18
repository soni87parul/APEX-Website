// Captures full-page screenshots of the built site. Usage: npm run build && npm run screenshots
// Starts `vite preview`, so no other server is needed. Output: docs/screenshots/.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const PORT = 4179;
const BASE = `http://localhost:${PORT}`;
const OUT = process.env.SHOT_DIR ?? 'docs/screenshots';
const widths = (process.env.SHOT_WIDTHS ?? '375,390,768,1024,1440,1920').split(',').map(Number);

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
});
const stop = () => server.kill();

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('preview server did not start');
}

try {
  await waitForServer();
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const pages = [
    ['home', '/'],
    ['events', '/events/'],
  ];
  for (const [name, route] of pages)
    for (const width of widths) {
      const page = await browser.newPage({
        viewport: { width, height: width < 768 ? 844 : 900 },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      // Scroll through so lazy images load, then return to the top.
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += 600) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(60);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() =>
        Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => {}))),
      );
      await page.waitForTimeout(400);
      await page.screenshot({
        path: `${OUT}/${name}-${width}.jpg`,
        fullPage: true,
        type: 'jpeg',
        quality: 72,
      });
      console.log('saved', `${OUT}/${name}-${width}.jpg`);
      await page.close();
    }

  // Mobile interaction states at 390px: menu open, enquiry step 2, an inline validation error.
  const m = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  await m.goto(BASE + '/', { waitUntil: 'networkidle' });
  await m.getByRole('button', { name: 'Open menu' }).click();
  await m.screenshot({ path: `${OUT}/mobile-menu-390.jpg`, type: 'jpeg', quality: 80 });
  await m.keyboard.press('Escape');
  await m.goto(BASE + '/work-with-apex', { waitUntil: 'networkidle' });
  await m.getByRole('radio', { name: 'Discuss an R&D project' }).check({ force: true });
  await m.getByRole('button', { name: /Continue/ }).click();
  await m
    .getByLabel('Technology area', { exact: true })
    .selectOption('Precision or biomass fermentation');
  await m.getByRole('button', { name: /Continue/ }).click();
  await m.addStyleTag({ content: '.site-header{display:none!important}' });
  await m.locator('.enquiry__panel').scrollIntoViewIfNeeded();
  await m
    .locator('.enquiry__panel')
    .screenshot({ path: `${OUT}/mobile-enquiry-step2-390.jpg`, type: 'jpeg', quality: 80 });
  await m.close();

  // Social preview image (public/og-image.jpg) from the hero at 1200x630.
  if (process.env.OG) {
    const og = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      reducedMotion: 'reduce',
    });
    await og.goto(BASE + '/', { waitUntil: 'networkidle' });
    await og.addStyleTag({
      content:
        '.site-header__nav,.site-header__cta,.hero__band,.hero__ctas,.hero__lede,.hero__tag{display:none!important}.hero{min-height:630px!important}.hero__content{padding-top:150px!important}',
    });
    await og.waitForTimeout(300);
    await og.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 82 });
    console.log('saved public/og-image.jpg');
    await og.close();
  }
  await browser.close();
} finally {
  stop();
}
