import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';

function isoDateOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

test('CT-RF-004 Programación exitosa de un alquiler', async ({ page }) => {
  const itemId = 1;
  await page.goto(`${appUrls.home}items/${itemId}`);
  await page.waitForLoadState('networkidle');
  // Use far-future dates to avoid conflicts with other tests
  // Use a worker-specific offset so parallel workers don't reserve the same dates
  const workerIndex = Number(process.env.PLAYWRIGHT_WORKER_INDEX ?? process.env.PW_WORKER_INDEX ?? 0);
  const baseOffset = 365 + workerIndex * 7; // each worker reserves a different week
  const start = isoDateOffset(baseOffset);
  const end = isoDateOffset(baseOffset + 1);

  const name = `Tester W${workerIndex}`;
  const email = `tester+${workerIndex}@example.com`;
  const phone = `+3412345${(10000 + workerIndex).toString().slice(-6)}`;

  await page.locator('#name').fill(name);
  await page.locator('#email').fill(email);
  await page.locator('#phone').fill(phone);
  await page.locator('#start').fill(start);
  await page.locator('#end').fill(end);

  // Submit and wait for a redirect back to the item page (with query params)
  await Promise.all([
    page.waitForURL(new RegExp(`/items/${itemId}.*`), { waitUntil: 'networkidle', timeout: 10000 }),
    page.getByRole('button', { name: 'Request rental' }).click(),
  ]);

  // Check that the URL includes success=1
  const finalUrl = page.url();
  if (!finalUrl.includes('success=1')) {
    // Dump page body for debugging
    const body = await page.locator('body').innerText();
    console.error('Expected success=1 in URL but got', finalUrl);
    console.error('Page body:', body.slice(0, 2000));
  }
  await expect(finalUrl.includes('success=1')).toBeTruthy();
});
