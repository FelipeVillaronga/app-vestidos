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

  const start = isoDateOffset(30);
  const end = isoDateOffset(31);


  const csrf = await page.locator('input[name="csrf"]').getAttribute('value');
  const name = 'Tester';
  const email = 'tester@example.com';
  const phone = '12345443432';


  if (csrf) {
    await page.context().addCookies([{
      name: 'gr_csrf',
      value: csrf,
      domain: new URL(appUrls.home).hostname,
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    }]);
  }

  const cookies = await page.context().cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  const form = new URLSearchParams({
    csrf: csrf ?? '',
    itemId: String(itemId),
    name,
    email,
    phone,
    start,
    end,
  });

  const resp = await page.request.post(`${appUrls.home}api/rentals`, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      cookie: cookieHeader,
    },
    body: form.toString(),
    maxRedirects: 0,
  });

  const status = resp.status();
  const location = resp.headers()['location'] || '';

  if (!location) {
    const text = await resp.text();
    console.error('Rental POST missing Location header. status=', status, 'body=', text);
  }

  await expect(status === 302 || status === 303).toBeTruthy();
  await expect(location.includes(`/items/${itemId}`)).toBeTruthy();
  await expect(location.includes('success=1')).toBeTruthy();

  await page.goto(location, { waitUntil: 'networkidle' });
  await expect(page.getByText('Rental request submitted successfully!')).toBeVisible();
});
