import { expect, test } from '@playwright/test';

// Success is only shown when a configured endpoint answers 2xx. This build sets no endpoint, so the test
// injects one by intercepting the module's fetch: it proves the success path renders when (and only when)
// the server confirms. Run `VITE_ENQUIRY_ENDPOINT=https://example.invalid/enquiry npm run build` first to exercise it.
test.skip(!process.env.ENQUIRY_ENDPOINT_BUILD, 'needs a build with VITE_ENQUIRY_ENDPOINT set');

test('shows the confirmation only after the endpoint confirms', async ({ page }) => {
  let body: Record<string, unknown> | null = null;
  await page.route('https://example.invalid/enquiry', async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/#work-with-apex');
  await page.getByRole('radio', { name: 'Explore pilot development' }).check({ force: true });
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByLabel('Technology area', { exact: true }).selectOption('Plant protein');
  await page.getByLabel('Organisation type').selectOption('Startup');
  await page
    .getByLabel('What would you like to achieve?')
    .fill('Pilot texturisation trials for a pulse protein.');
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByLabel('Full name').fill('Test Person');
  await page.getByLabel('Work email').fill('test@example.com');
  await page.getByLabel('Organisation', { exact: true }).fill('Example Foods');
  await page.getByLabel(/I agree/).check();
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await expect(page.getByRole('heading', { name: /Your enquiry has been received/ })).toBeVisible();
  expect(body).toMatchObject({ objective: 'pilot', email: 'test@example.com', website: '' });
});

test('shows an error, not success, when the endpoint fails', async ({ page }) => {
  await page.route('https://example.invalid/enquiry', (route) =>
    route.fulfill({ status: 500, body: 'error' }),
  );
  await page.goto('/#work-with-apex');
  await page.getByRole('radio', { name: 'Discuss a partnership' }).check({ force: true });
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByLabel('Technology area', { exact: true }).selectOption('Not sure yet');
  await page.getByLabel('Organisation type').selectOption('Research institution');
  await page
    .getByLabel('What would you like to achieve?')
    .fill('A joint research programme on growth media.');
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByLabel('Full name').fill('Test Person');
  await page.getByLabel('Work email').fill('test@example.com');
  await page.getByLabel('Organisation', { exact: true }).fill('Example Institute');
  await page.getByLabel(/I agree/).check();
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await expect(page.getByRole('alert')).toContainText('could not be sent');
  await expect(page.getByText('Your enquiry has been received')).toHaveCount(0);
});
