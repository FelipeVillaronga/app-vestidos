import { test, expect } from '@playwright/test';
import { appUrls } from './testData/urls';

function isoDateOffset(days: number) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
}

test('CT-RF-004-03 Programación con fecha o datos inválidos (end before start)', async ({ page }) => {
    const itemId = 1;
    await page.goto(`${appUrls.home}items/${itemId}`);
    await page.waitForLoadState('networkidle');

    const start = isoDateOffset(3);
    const end = isoDateOffset(1); // end before start

    await page.locator('#name').fill('Playwright Invalid Date');
    await page.locator('#email').fill('invalid@example.com');
    await page.locator('#phone').fill('+34123456789');
    await page.locator('#start').fill(start);
    await page.locator('#end').fill(end);

    await page.getByRole('button', { name: 'Request rental' }).click();

    await page.waitForURL('**/api/rentals', { timeout: 5000 });
    const body = await page.locator('body').innerText();
    await expect(body).toContain('End date must be after start date');
});
