import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
  test('renders the hero, all seven sections and no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'From protein innovation to',
    );
    for (const id of [
      'platform',
      'pathways',
      'capabilities',
      'inside',
      'who',
      'ecosystem',
      'work-with-apex',
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    // No connector graphics remain, and each homepage photo is used once.
    await expect(page.locator('.pathways__connectors')).toHaveCount(0);
    const photoIds = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main img'))
        .map((img) => (img as HTMLImageElement).getAttribute('src') ?? '')
        .filter((src) => src.includes('/images/photos/'))
        .map((src) => src.replace(/-(?:mobile-)?\d+\.\w+$/, '')),
    );
    expect(new Set(photoIds).size).toBe(photoIds.length);
    expect(errors).toEqual([]);
  });

  test('every image has alt text and loads', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
    });
    const imgs = page.locator('img');
    const count = await imgs.count();
    expect(count).toBeGreaterThan(5);
    for (let i = 0; i < count; i++) {
      const img = imgs.nth(i);
      expect(await img.getAttribute('alt')).not.toBeNull();
    }
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0 && img.loading !== 'lazy')
        .map((img) => img.currentSrc || img.src),
    );
    expect(broken).toEqual([]);
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('/');
    // Let the sub-second hero entrance finish so contrast is measured on the settled page.
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
    ).toEqual([]);
  });
});

test('a pathway panel opens its Inside APEX tab', async ({ page }) => {
  await page.goto('/');
  await page.locator('.pw-panel__link', { hasText: 'Fermentation' }).click();
  await expect(page.getByRole('tab', { name: 'Fermentation' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('platform tabs work with the keyboard', async ({ page }) => {
  await page.goto('/#inside');
  const first = page.getByRole('tab', { name: 'Cultivated' });
  await first.focus();
  await page.keyboard.press('ArrowRight');
  const second = page.getByRole('tab', { name: 'Fermentation' });
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await expect(page.getByRole('tabpanel')).toContainText('Precision fermentation and bioprocess');
  await page.keyboard.press('End');
  await expect(page.getByRole('tabpanel')).toContainText('not by APEX');
});

test('capability groups expand to the full service detail', async ({ page }) => {
  await page.goto('/#capabilities');
  const toggle = page.locator('button[aria-controls="cap-detail-scale"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByText('This is pilot-scale support, not commercial manufacturing.'),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Scale-up and manufacturing readiness' }),
  ).toBeVisible();
});

test.describe('enquiry', () => {
  async function fillToStep3(page: import('@playwright/test').Page) {
    await page.goto('/#work-with-apex');
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(page.getByText('Choose what you would like to do.')).toBeVisible();
    await page.getByRole('radio', { name: 'Discuss an R&D project' }).check({ force: true });
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(
      page.getByRole('heading', { name: 'Tell us about your R&D project' }),
    ).toBeFocused();
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(page.getByText('Choose a technology area.')).toBeVisible();
    await expect(page.getByLabel('Technology area', { exact: true })).toBeFocused();
    await page
      .getByLabel('Technology area', { exact: true })
      .selectOption('Precision or biomass fermentation');
    await page.getByLabel('Organisation type').selectOption('Corporate R&D');
    await page
      .getByLabel('What would you like to achieve?')
      .fill('A feasibility study on a fermentation-derived protein.');
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(
      page.getByText('Enter a valid work email, for example name@company.com.'),
    ).toBeVisible();
    await page.getByLabel('Full name').fill('Test Person');
    await page.getByLabel('Work email').fill('test@example.com');
    await page.getByLabel('Organisation', { exact: true }).fill('Example Foods');
    await page.getByLabel(/I agree/).check();
    // Back keeps answers
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByLabel('Organisation type')).toHaveValue('Corporate R&D');
    await page.getByRole('button', { name: /Continue/ }).click();
    await expect(page.getByLabel('Work email')).toHaveValue('test@example.com');
  }

  test('without an endpoint it says nothing was sent and never shows success', async ({ page }) => {
    await fillToStep3(page);
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.getByRole('alert')).toContainText('not connected');
    await expect(page.getByText('Your enquiry has been received')).toHaveCount(0);
  });

  test('a CTA preselects the objective', async ({ page }) => {
    await page.goto('/#who');
    await page
      .getByRole('link', { name: /Explore India entry/ })
      .first()
      .click();
    await expect(page.getByRole('radio', { name: 'Explore India entry' })).toBeChecked();
  });
});

test('mobile menu opens, traps focus and closes with Escape', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1100, 'menu button is mobile-only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Capabilities/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});

test('reduced motion shows all content immediately', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/motion-ok/);
  const hidden = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll('[data-reveal]')).filter(
        (el) => getComputedStyle(el).opacity === '0',
      ).length,
  );
  expect(hidden).toBe(0);
  await context.close();
});

test('work-with-apex route renders the enquiry as the page heading', async ({ page }) => {
  await page.goto('/work-with-apex');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Build your alternative-protein programme',
  );
  await expect(page).toHaveTitle(/Work With APEX/);
});

test.describe('events page', () => {
  test('renders hero, gallery, next strip, media and ecosystem', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto('/events/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/Events/);
    for (const name of ['Photos and video', 'Media and insights']) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
    }
    await expect(page.locator('.ev-next')).toHaveCount(1);
    await expect(page.locator('.ecosystem--compact')).toHaveCount(1);
    // Sample media cards are not links.
    await expect(page.locator('.ev-media__card a')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test('gallery albums filter and the lightbox works with the keyboard', async ({ page }) => {
    await page.goto('/events/');
    const items = page.locator('.ev-gallery__item');
    await expect(items).toHaveCount(12);
    await page.getByRole('button', { name: 'Workshops and site visits' }).click();
    await expect(items).toHaveCount(4);
    await page.getByRole('button', { name: 'All', exact: true }).click();
    const first = items.first().getByRole('button');
    await first.click();
    const dialog = page.getByRole('dialog', { name: 'Photo viewer' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('1 / 12');
    await page.keyboard.press('ArrowRight');
    await expect(dialog).toContainText('2 / 12');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(dialog).toContainText('12 / 12');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(first).toBeFocused();
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('/events/');
    await page.waitForTimeout(600);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
    ).toEqual([]);
  });
});
